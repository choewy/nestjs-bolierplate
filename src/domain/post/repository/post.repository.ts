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
      .addSelect('createDate', 'date')
      .addSelect('memberId')
      .where('memberId = :memberId', { memberId })
      .andWhere('createDate >= :startDate', { startDate: DateTime.fromJSDate(startDate).toSQLDate() })
      .andWhere('createDate <= :endDate', { endDate: DateTime.fromJSDate(endDate).toSQLDate() })
      .groupBy('createDate')
      .getRawMany<{
        memberId: number;
        date: Date;
        count: number;
      }>();
  }
}
