import { Module } from '@nestjs/common';

import { FollowRepository } from './repository/follow.repository';
import { FollowReadService } from './service/follow-read.service';
import { FollowWriteService } from './service/follow-write.service';

const FollowProviders = [FollowRepository, FollowReadService, FollowWriteService];

@Module({
  providers: FollowProviders,
  exports: FollowProviders,
})
export class FollowModule {}
