import { Module } from '@nestjs/common';

import { MemberController } from './controller/member.controller';
import { MemberRepository } from './repository/member.repository';
import { MemberWriteService } from './service/member-write.service';

@Module({
  controllers: [MemberController],
  providers: [MemberRepository, MemberWriteService],
})
export class MemberModule {}
