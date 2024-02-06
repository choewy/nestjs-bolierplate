import { Injectable, Scope } from '@nestjs/common';

import { MemberReadService } from '@domain/member/service/member-read.service';
import { FollowWriteService } from '@domain/follow/service/follow-write.service';

@Injectable({ scope: Scope.REQUEST })
export class InsertFollowMemberUsecase {
  constructor(private readonly memberReadService: MemberReadService, private readonly followWriteService: FollowWriteService) {}

  async execute(fromMemberId: number, toMemberId: number) {
    await this.followWriteService.create(
      await this.memberReadService.getMember(fromMemberId),
      await this.memberReadService.getMember(toMemberId),
    );
  }
}
