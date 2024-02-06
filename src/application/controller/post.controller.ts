import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePostCommand } from '@domain/post/dto/create-post.command';

import { InsertPostUsecase } from '../usecase/insert-post.usecase';
import { GetDailyPostCountUsecase } from '../usecase/get-daily-post-count.usecase';

import { DailyPostCountDto } from '@domain/post/dto/daliy-post-count.dto';
import { DailyPostCountCriteria } from '@domain/post/dto/daily-post-count.criteria';

@ApiTags('포스트')
@Controller('posts')
export class PostController {
  constructor(private readonly getDailyPostCountUsecase: GetDailyPostCountUsecase, private readonly insertPostUsecase: InsertPostUsecase) {}

  @Get('daily-count')
  @ApiOperation({ summary: '일별 포스트 개수 조회' })
  @ApiOkResponse({ type: [DailyPostCountDto] })
  async getDailyPostCount(@Query() criteria: DailyPostCountCriteria) {
    return this.getDailyPostCountUsecase.execute(criteria);
  }

  @Post()
  @ApiOperation({ summary: '포스트 등록' })
  @ApiCreatedResponse({ type: null })
  async createPost(@Body() command: CreatePostCommand): Promise<void> {
    return this.insertPostUsecase.execute(command);
  }
}
