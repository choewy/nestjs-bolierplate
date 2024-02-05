import { Injectable } from '@nestjs/common';

import { MemberReadService } from '@domain/member/service/member-read.service';
import { FollowWriteService } from '@domain/follow/service/follow-write.service';

@Injectable()
export class InsertFollowMemberUsecase {
  constructor(private readonly memberReadService: MemberReadService, private readonly followWriteService: FollowWriteService) {}

  async execute(fromMemberId: number, toMemberId: number) {
    const fromMember = await this.memberReadService.getMember(fromMemberId);
    const toMember = await this.memberReadService.getMember(toMemberId);

    await this.followWriteService.create(fromMember, toMember);
  }
}
