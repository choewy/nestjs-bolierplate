import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Follow } from '../entity/follow.entity';

@Injectable()
export class FollowRepository extends Repository<Follow> {
  constructor(dataSource: DataSource) {
    super(Follow, dataSource.createEntityManager());
  }

  async existsByMembers(fromMemberId: number, toMemberId: number) {
    return this.existsBy({
      fromMember: { id: fromMemberId },
      toMember: { id: toMemberId },
    });
  }

  async findByFromMemberId(fromMemberId: number) {
    return this.find({
      relations: { toMember: true },
      where: { fromMember: { id: fromMemberId } },
    });
  }

  async findByToMemberId(toMemberId: number) {
    return this.find({
      relations: { fromMember: true },
      where: { toMember: { id: toMemberId } },
    });
  }
}
