import { Injectable } from '@nestjs/common';

import { FollowRepository } from '../repository/follow.repository';
import { FollowDto } from '../dto/follow.dto';
import { MemberDto } from '@domain/member/dto/member.dto';

@Injectable()
export class FollowReadService {
  constructor(private readonly followRepository: FollowRepository) {}

  async getFollowings(member: MemberDto) {
    const followings = await this.followRepository.findByFromMemberId(member.id);

    return followings.map((following) => new FollowDto(following, 'toMember'));
  }

  async getFollowers(member: MemberDto) {
    const followers = await this.followRepository.findByToMemberId(member.id);

    return followers.map((follower) => new FollowDto(follower, 'fromMember'));
  }
}
