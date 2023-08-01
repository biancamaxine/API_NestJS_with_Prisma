import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll(args?: {
    userId?: number;
    title?: string;
  }): Promise<PostEntity[]> {
    const filter: Prisma.PostFindManyArgs | Prisma.PostFindUniqueArgs = {
      where: {
        OR: [{ title: { contains: args.title ?? '' } }],
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    };

    if (!args.userId) return this.prisma.post.findMany(filter);
    return this.prisma.user
      .findUnique({ where: { id: args?.userId } })
      .posts(filter);
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
