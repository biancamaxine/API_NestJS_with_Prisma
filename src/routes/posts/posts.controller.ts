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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Post('users/:userId/posts')
  create(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(+userId, createPostDto);
  }

  @ApiNotFoundResponse({ description: 'User not found or Post not found.' })
  @Get(['posts', 'posts/:id', 'users/:userId/posts'])
  read(
    @Param() { id, userId }: { id?: string; userId?: string },
    @Query() { title }: { title?: string },
  ) {
    return this.postsService.read(+id, +userId, title);
  }

  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @Patch('posts/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiNotFoundResponse({ description: 'Post not found.' })
  @Delete('posts/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
