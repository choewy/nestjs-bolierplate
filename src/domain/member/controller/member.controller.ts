import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MemberWriteService } from '../service/member-write.service';
import { MemberReadService } from '../service/member-read.service';
import { RegisterMemberCommand } from '../dto/register-member.command';
import { MemberDto } from '../dto/member.dto';

@ApiTags('회원정보')
@Controller('members')
export class MemberController {
  constructor(private readonly memberWriteService: MemberWriteService, private readonly memberReadService: MemberReadService) {}

  @Post()
  @ApiOperation({ summary: '회원등록' })
  @ApiCreatedResponse({ type: MemberDto })
  async registerMember(@Body() command: RegisterMemberCommand): Promise<MemberDto> {
    return this.memberWriteService.registerMember(command);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '회원 정보 조회' })
  @ApiOkResponse({ type: MemberDto })
  async getMember(@Param('id') id: number) {
    return this.memberReadService.getMember(id);
  }
}
