import { Injectable, NotFoundException } from '@nestjs/common';

import { MemberRepository } from '../repository/member.repository';
import { MemberDto } from '../dto/member.dto';

@Injectable()
export class MemberReadService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async getMember(id: number) {
    const member = await this.memberRepository.findById(id);

    if (member == null) {
      throw new NotFoundException('회원 정보를 찾을 수 없습니다.');
    }

    return new MemberDto(member);
  }
}
