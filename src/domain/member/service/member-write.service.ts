import { Injectable } from '@nestjs/common';

import { MemberRepository } from '../repository/member.repository';
import { Member } from '../entity/member.entity';
import { RegisterMemberCommand } from '../dto/register-member.command';

@Injectable()
export class MemberWriteService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async register(command: RegisterMemberCommand): Promise<Member> {
    const member = command.toEntity();

    await this.memberRepository.insert(member);

    return member;
  }
}
