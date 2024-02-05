import { Module } from '@nestjs/common';

import { MemberRepository } from './repository/member.repository';
import { MemberWriteService } from './service/member-write.service';
import { MemberReadService } from './service/member-read.service';
import { MemberNicknameHistoryRepository } from './repository/member-nickname-history.repository';

const MemberProviders = [MemberRepository, MemberNicknameHistoryRepository, MemberWriteService, MemberReadService];

@Module({
  providers: MemberProviders,
  exports: MemberProviders,
})
export class MemberModule {}
