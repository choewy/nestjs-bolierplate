import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MemberReadService } from '../service/member-read.service';
import { MemberNicknameHistoryDto } from '../dto/member-nickname-history.dto';

@ApiTags('회원 정보 수정 이력')
@Controller('member-history')
export class MemberHistoryController {
  constructor(private readonly memberReadService: MemberReadService) {}

  @Get(':id(\\d+)/nickname')
  @ApiOperation({ summary: '닉네임 변경 이력 조회' })
  @ApiOkResponse({ type: [MemberNicknameHistoryDto] })
  async getMemberNicknameHistories(@Param('id') id: number) {
    return this.memberReadService.getMemberNicknameHistories(id);
  }
}
