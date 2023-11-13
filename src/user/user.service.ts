import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  async findOne(username: string): Promise<UserEntity> {
    return await this.userRepo.findOneBy({ username: username })
  }

  async create(username: string, password: string): Promise<UserEntity> {
    return await this.userRepo.save({ username: username, password: password });
  }
}
