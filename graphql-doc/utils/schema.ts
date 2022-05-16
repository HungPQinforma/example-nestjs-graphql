import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import glob from 'glob-promise';

export async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const schemaFactory = app.get(GraphQLSchemaFactory);
  const resolvers = await importResolvers();
  const schema = await schemaFactory.create(resolvers);

  return schema;
}

async function importResolvers() {
  const resolvers = [];
  const filePaths: string[] = await glob('src/**/*');

  for (let path of filePaths) {
    if (path.includes('resolver')) {
      const module = await import('../../' + path.replace('.ts', ''));
      const pathPartials = path.split('/');
      const fileName = pathPartials[pathPartials.length - 1];
      const fileNamePartials = fileName.split('.');
      const resolverName = capitalize(fileNamePartials[0]) + 'Resolver';
      resolvers.push(module[resolverName]);
    }
  }

  return resolvers;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
