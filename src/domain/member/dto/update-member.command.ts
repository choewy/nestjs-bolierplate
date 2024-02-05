import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Member } from '../entity/member.entity';
import { MemberNicknameHistory } from '../entity/member-nickname-history.entity';

export class UpdateMemberCommand {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(10)
  readonly nickname: string;

  toEntity() {
    return plainToInstance(Member, {
      nickname: this.nickname,
    });
  }

  toNicknmaeHistory(member: Member) {
    return plainToInstance(MemberNicknameHistory, {
      member: { id: member.id },
      beforeNickname: member.nickname,
      afterNickname: this.nickname,
    });
  }
}
