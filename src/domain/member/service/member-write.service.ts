import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { MemberRepository } from '../repository/member.repository';
import { MemberNicknameHistoryRepository } from '../repository/member-nickname-history.repository';

import { RegistMemberCommand } from '../dto/regist-member.command';
import { UpdateMemberNicknameCommand } from '../dto/update-member.command';
import { MemberDto } from '../dto/member.dto';

@Injectable()
export class MemberWriteService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberNicknameHistoryRepository: MemberNicknameHistoryRepository,
  ) {}

  async registerMember(command: RegistMemberCommand): Promise<MemberDto> {
    if (await this.memberRepository.existsByEmail(command.email)) {
      throw new ConflictException('이미 등록된 회원입니다.');
    }

    const member = command.toEntity();
    await this.memberRepository.insert(member);

    return new MemberDto(member);
  }

  async updateMemberNickname(id: number, command: UpdateMemberNicknameCommand) {
    const member = await this.memberRepository.findById(id);

    if (member == null) {
      throw new NotFoundException('회원 정보를 찾을 수 없습니다.');
    }

    if (member.nickname !== command.nickname) {
      await this.memberRepository.update(id, command.toEntity());
      await this.memberNicknameHistoryRepository.insert(command.toNicknmaeHistory(member));
    }
  }
}
