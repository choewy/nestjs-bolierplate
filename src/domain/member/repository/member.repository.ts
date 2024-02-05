import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Member } from '../entity/member.entity';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(dataSource: DataSource) {
    super(Member, dataSource.createEntityManager());
  }

  async existsByEmail(email: string) {
    return this.existsBy({ email });
  }

  async findById(id: number) {
    return this.findOne({ where: { id } });
  }
}
