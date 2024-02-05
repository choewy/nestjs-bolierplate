import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MemberReadService } from '@domain/member/service/member-read.service';
import { MemberWriteService } from '@domain/member/service/member-write.service';
import { RegistMemberCommand } from '@domain/member/dto/regist-member.command';
import { UpdateMemberCommand } from '@domain/member/dto/update-member.command';
import { MemberDto } from '@domain/member/dto/member.dto';

@ApiTags('회원정보')
@Controller('members')
export class MemberController {
  constructor(private readonly memberReadService: MemberReadService, private readonly memberWriteService: MemberWriteService) {}

  @Post()
  @ApiOperation({ summary: '회원 등록' })
  @ApiCreatedResponse({ type: MemberDto })
  async registerMember(@Body() command: RegistMemberCommand): Promise<MemberDto> {
    return this.memberWriteService.registerMember(command);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '회원 정보 조회' })
  @ApiOkResponse({ type: MemberDto })
  async getMember(@Param('id') id: number) {
    return this.memberReadService.getMember(id);
  }

  @Get(':id(\\d+)/nickname-histories')
  @ApiOperation({ summary: '회원 닉네임 변경 이력 조회' })
  async getMemberNicknameHistories(@Param('id') id: number) {
    return this.memberReadService.getMemberNicknameHistories(id);
  }

  @Patch(':id(\\d+)/nickname')
  @ApiOperation({ summary: '회원 닉네임 수정' })
  @ApiOkResponse({ type: null })
  async updateMemberNickname(@Param('id') id: number, @Body() command: UpdateMemberCommand) {
    return this.memberWriteService.updateMemberNickname(id, command);
  }
}
