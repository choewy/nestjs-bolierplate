import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Post } from '../entity/post.entity';
import { DateTime } from 'luxon';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async countsByDaily(memberId: number, startDate: Date, endDate: Date) {
    return this.createQueryBuilder()
      .select('COUNT(id)', 'count')
      .addSelect('DATE_FORMAT(createdAt, "%Y-%m-%d")', 'date')
      .addSelect('memberId')
      .where('memberId = :memberId', { memberId })
      .andWhere('createdAt >= :startDate', { startDate: DateTime.fromJSDate(startDate).toSQLDate() })
      .andWhere('createdAt <= :endDate', { endDate: DateTime.fromJSDate(endDate).toSQLDate() })
      .groupBy('date')
      .getRawMany<{
        memberId: number;
        date: string;
        count: number;
      }>();
  }
}
