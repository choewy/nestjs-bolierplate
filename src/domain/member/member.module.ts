import { Module } from '@nestjs/common';

import { MemberController } from './controller/member.controller';
import { MemberHistoryController } from './controller/member-history.controller';
import { MemberRepository } from './repository/member.repository';
import { MemberWriteService } from './service/member-write.service';
import { MemberReadService } from './service/member-read.service';
import { MemberNicknameHistoryRepository } from './repository/member-nickname-history.repository';

@Module({
  controllers: [MemberController, MemberHistoryController],
  providers: [MemberRepository, MemberNicknameHistoryRepository, MemberWriteService, MemberReadService],
})
export class MemberModule {}
