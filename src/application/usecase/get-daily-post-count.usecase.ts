import { Injectable } from '@nestjs/common';

import { MemberReadService } from '@domain/member/service/member-read.service';
import { PostReadService } from '@domain/post/service/post-read.service';
import { DailyPostCountDto } from '@domain/post/dto/daliy-post-count.dto';
import { DailyPostCountCriteria } from '@domain/post/dto/daily-post-count.criteria';

@Injectable()
export class GetDailyPostCountUsecase {
  constructor(private readonly memberReadService: MemberReadService, private readonly postReadService: PostReadService) {}

  async execute(criteria: DailyPostCountCriteria): Promise<DailyPostCountDto[]> {
    await this.memberReadService.hasMember(criteria.memberId);

    return this.postReadService.getDailyPostCounts(criteria);
  }
}
