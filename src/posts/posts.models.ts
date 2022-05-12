import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { User } from 'src/users/users.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String, { description: 'Post content' })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User, { description: 'Belonged user' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Post input: content' })
  username: string;

  @Field(() => User, { description: 'Post input: belonged user' })
  user: User;
}
