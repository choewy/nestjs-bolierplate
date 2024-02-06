import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePostCommand } from '@domain/post/dto/insert-post.command';

import { InsertPostUsecase } from '../usecase/insert-post.usecase';

@ApiTags('포스트')
@Controller('posts')
export class PostController {
  constructor(private readonly insertPostUsecase: InsertPostUsecase) {}

  @Post()
  @ApiOperation({ summary: '포스트 등록' })
  @ApiCreatedResponse({ type: null })
  async createPost(@Body() command: CreatePostCommand): Promise<void> {
    return this.insertPostUsecase.execute(command);
  }
}
