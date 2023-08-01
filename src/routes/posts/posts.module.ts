import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { UsersRepository } from '../users/repositories/users.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './repositories/post.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PostsRepository, UsersRepository],
})
export class PostsModule {}
