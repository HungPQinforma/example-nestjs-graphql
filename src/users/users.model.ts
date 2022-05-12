import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Post } from 'src/posts/posts.models';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@InputType('user')
@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String, { description: 'Fullname' })
  username: string;

  @Column()
  @Field(() => String, { description: 'Email address' })
  email: string;

  @Column()
  @Field(() => String, { description: 'Hashed password' })
  password: string;

  @Column()
  @Field(() => Int, { description: 'Activation status', nullable: true })
  status: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User input: Fullname' })
  username: string;

  @Field(() => String, { description: 'User input: Email address' })
  email: string;

  @Field(() => String, { description: 'User input: Hashed password' })
  password: string;
}
