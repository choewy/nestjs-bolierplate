import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InsertFollowMemberUsecase } from '../usecase/insert-follow-member.usecase';
import { GetFollowerMembersUsecase } from '../usecase/get-follower-members.usecase';
import { GetFollowingMembersUsecase } from '../usecase/get-following-members.usecase';

@ApiTags('팔로우')
@Controller('follows')
export class FollowController {
  constructor(
    private readonly insertFollowMemberUsecase: InsertFollowMemberUsecase,
    private readonly getFollowerMembersUsecase: GetFollowerMembersUsecase,
    private readonly getFollowingMembersUsecase: GetFollowingMembersUsecase,
  ) {}

  @Post(':fromId(\\d+)/:toId(\\d+)')
  @ApiOperation({ summary: '팔로우' })
  async follow(@Param('fromId') fromId: number, @Param('toId') toId: number) {
    await this.insertFollowMemberUsecase.execute(fromId, toId);
  }

  @Get(':memberId(\\d+)/followers')
  @ApiOperation({ summary: '팔로워 조회' })
  async getFollowers(@Param('memberId') memberId: number) {
    return this.getFollowerMembersUsecase.execute(memberId);
  }

  @Get(':memberId(\\d+)/followings')
  @ApiOperation({ summary: '팔로잉 조회' })
  async getFollowings(@Param('memberId') memberId: number) {
    return this.getFollowingMembersUsecase.execute(memberId);
  }
}
