import { Injectable, Scope } from '@nestjs/common';

import { MemberReadService } from '@domain/member/service/member-read.service';
import { FollowReadService } from '@domain/follow/service/follow-read.service';

@Injectable({ scope: Scope.REQUEST })
export class GetFollowerMembersUsecase {
  constructor(private readonly memberReadService: MemberReadService, private readonly followReadService: FollowReadService) {}

  async execute(memberId: number) {
    const member = await this.memberReadService.getMember(memberId);

    return this.followReadService.getFollowers(member);
  }
}
