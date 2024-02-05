import { Module } from '@nestjs/common';

import { MemberController } from './controller/member.controller';
import { MemberRepository } from './repository/member.repository';
import { MemberWriteService } from './service/member-write.service';
import { MemberReadService } from './service/member-read.service';

@Module({
  controllers: [MemberController],
  providers: [MemberRepository, MemberWriteService, MemberReadService],
})
export class MemberModule {}
