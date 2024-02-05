import { Injectable, NotFoundException } from '@nestjs/common';

import { MemberRepository } from '../repository/member.repository';
import { MemberNicknameHistoryRepository } from '../repository/member-nickname-history.repository';

import { MemberDto } from '../dto/member.dto';
import { MemberNicknameHistoryDto } from '../dto/member-nickname-history.dto';

@Injectable()
export class MemberReadService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberNicknameHistoryRepository: MemberNicknameHistoryRepository,
  ) {}

  async getMember(id: number) {
    const member = await this.memberRepository.findById(id);

    if (member == null) {
      throw new NotFoundException('회원 정보를 찾을 수 없습니다.');
    }

    return new MemberDto(member);
  }

  async getMemberNicknameHistories(id: number): Promise<MemberNicknameHistoryDto[]> {
    if ((await this.memberRepository.existsById(id)) === false) {
      throw new NotFoundException('회원 정보를 찾을 수 없습니다.');
    }

    const memberNicknameHistories = await this.memberNicknameHistoryRepository.findBy({ id });
    return memberNicknameHistories.map((memberNicknameHistory) => new MemberNicknameHistoryDto(memberNicknameHistory));
  }
}
