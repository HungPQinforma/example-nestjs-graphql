import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput, User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInput) {
    const user = await this.userRepository.save(
      this.userRepository.create(data),
    );

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }
}
