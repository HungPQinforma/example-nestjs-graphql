import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateUserInput, User } from './users.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    const users = await this.usersService.findAll();
    console.log('reach', users);
    return users;
  }
}
