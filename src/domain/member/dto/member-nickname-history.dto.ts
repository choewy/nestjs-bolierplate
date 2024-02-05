import { ApiResponseProperty } from '@nestjs/swagger';

import { MemberNicknameHistory } from '../entity/member-nickname-history.entity';

export class MemberNicknameHistoryDto {
  @ApiResponseProperty({ type: Number })
  readonly id: number;

  @ApiResponseProperty({ type: String })
  readonly beforeNickname: string;

  @ApiResponseProperty({ type: String })
  readonly updatedNickname: string;

  @ApiResponseProperty({ type: Date, format: 'date-time' })
  readonly createdAt: string;

  constructor(memberNicknameHistory: MemberNicknameHistory) {
    this.id = memberNicknameHistory.id;
    this.beforeNickname = memberNicknameHistory.beforeNickname;
    this.updatedNickname = memberNicknameHistory.updatedNickname;
    this.createdAt = memberNicknameHistory.createdAtToString();
  }
}
