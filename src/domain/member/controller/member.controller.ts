import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MemberWriteService } from '../service/member-write.service';
import { RegisterMemberCommand } from '../dto/register-member.command';
import { RegisteredMemberDto } from '../dto/registered-member.dto';

@ApiTags('회원정보')
@Controller('members')
export class MemberController {
  constructor(private readonly memberWriteService: MemberWriteService) {}

  @Post()
  @ApiOperation({ summary: '회원등록' })
  @ApiCreatedResponse({ type: RegisteredMemberDto })
  async register(@Body() command: RegisterMemberCommand): Promise<RegisteredMemberDto> {
    return new RegisteredMemberDto(await this.memberWriteService.register(command));
  }
}
