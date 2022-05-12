# POC: generate Graphql API with code-first approach

### Description
One `user` has many `Post`(s)

### Run project

Configure database in `src/app.module.ts`
```
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'username',
  password: 'password',
  database: 'dbname',
  synchronize: true, // change to migration mode on prod
  ...
}),
```

Start server
```
yarn install
yarn start
```

Access Graphql API docs at `http://localhost:3000/graphql`

### Notes

Queries and mutations API doc are auto-generated after models being annotated. Hence, we only need to annotate models.

To annotate a model, use @Field decorator
(2nd argument is to make document more verbose, with options such as description, nullable, defaut, etc.)

```
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => String, { description: 'Fullname' })
  username: string;

  @Field(() => String, { description: 'Hashed password' })
  password: string;
}
```

To annotate a model relationship, use @Field decorator with type of referenced model

```
import { ObjectType, Field } from '@nestjs/graphql'
import { Post } from '...'

export class User {
  @Field(() => Post, post => post.user)
  posts: Post[]
}

```

To avoid error `typeorm EntityMetadataNotFound: No metadata for "User" was found.`, ensure model is decorated with @Entity

```
import { Entity } from 'typeorm'

@Entity('users')
export class User {}
```

To reference one model to DTO interfaces, decorate the model with @InputType

```
import { InputType } from '@nestjs/graphql'

@InputType('user')
export class User {}

// now it is able to be referenced
@InputType()
export class CreatePostInput {
  @Field(() => User, { description: 'Post input: belonged user' })
  user: User;
}
```