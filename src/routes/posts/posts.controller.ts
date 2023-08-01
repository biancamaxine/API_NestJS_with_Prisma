import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('users/:userId/posts')
  create(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(+userId, createPostDto);
  }

  @Get(['posts', 'posts/:id', 'users/:userId/posts'])
  read(
    @Param() { id, userId }: { id: string; userId: string },
    @Query('title') title: string,
  ) {
    return this.postsService.read(+id, +userId, title);
  }

  @Patch('posts/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete('posts/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
