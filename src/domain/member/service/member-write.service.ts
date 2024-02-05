import { ConflictException, Injectable } from '@nestjs/common';

import { MemberRepository } from '../repository/member.repository';
import { RegisterMemberCommand } from '../dto/register-member.command';
import { MemberDto } from '../dto/member.dto';

@Injectable()
export class MemberWriteService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async registerMember(command: RegisterMemberCommand): Promise<MemberDto> {
    const member = command.toEntity();

    if (await this.memberRepository.existsByEmail(member.email)) {
      throw new ConflictException('이미 등록된 회원입니다.');
    }

    await this.memberRepository.insert(member);

    return new MemberDto(member);
  }
}
