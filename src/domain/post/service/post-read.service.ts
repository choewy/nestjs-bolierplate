import { Injectable } from '@nestjs/common';

import { PostRepository } from '../repository/post.repository';
import { DailyPostCountCriteria } from '../dto/daily-post-count.criteria';
import { DailyPostCountDto } from '../dto/daliy-post-count.dto';

@Injectable()
export class PostReadService {
  constructor(private readonly postRepository: PostRepository) {}

  async getDailyPostCounts(criteria: DailyPostCountCriteria): Promise<DailyPostCountDto[]> {
    const rows = await this.postRepository.countsByDaily(criteria.memberId, criteria.startDate, criteria.endDate);

    return rows.map((row) => new DailyPostCountDto(row.memberId, row.date, +row.count));
  }
}
