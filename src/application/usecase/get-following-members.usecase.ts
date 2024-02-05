import { Injectable } from '@nestjs/common';

import { MemberReadService } from '@domain/member/service/member-read.service';
import { FollowReadService } from '@domain/follow/service/follow-read.service';

@Injectable()
export class GetFollowingMembersUsecase {
  constructor(private readonly memberReadService: MemberReadService, private readonly followReadService: FollowReadService) {}

  async execute(memberId: number) {
    const member = await this.memberReadService.getMember(memberId);

    return this.followReadService.getFollowings(member);
  }
}
