import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/HttpErrors';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(createUserDto);
  }

  async read(id?: number, name?: string): Promise<UserEntity | UserEntity[]> {
    if (!id) return this.userRepository.findAll(name);
    await this.validateUser(id);
    return this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.validateUser(id);
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserEntity> {
    await this.validateUser(id);
    return this.userRepository.remove(id);
  }

  private async validateUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundError('User not found.');
  }
}
