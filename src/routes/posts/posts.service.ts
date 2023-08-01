import { Injectable } from '@nestjs/common';

import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/post.repository';
import { NotFoundError } from 'src/common/errors/types/HttpErrors';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async create(
    userId: number,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    await this.validateUser(userId);
    return this.postRepository.create(userId, createPostDto);
  }

  async read(
    id: number,
    userId: number,
    title: string,
  ): Promise<PostEntity | PostEntity[]> {
    if (!userId) {
      if (!id) return this.postRepository.findAll({ title });
      await this.validatePost(id);
      return this.postRepository.findOne(id);
    }
    await this.validateUser(userId);
    return this.postRepository.findAll({ userId, title });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    await this.validatePost(id);
    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<PostEntity> {
    await this.validatePost(id);
    return this.postRepository.remove(id);
  }

  private async validatePost(id: number): Promise<void> {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundError('Post not found.');
  }

  private async validateUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundError('User not found.');
  }
}
