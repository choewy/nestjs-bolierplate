import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { MemberNicknameHistory } from '../entity/member-nickname-history.entity';

@Injectable()
export class MemberNicknameHistoryRepository extends Repository<MemberNicknameHistory> {
  constructor(dataSource: DataSource) {
    super(MemberNicknameHistory, dataSource.createEntityManager());
  }

  async findByMemberId(memberId: number) {
    return this.findBy({ member: { id: memberId } });
  }
}
