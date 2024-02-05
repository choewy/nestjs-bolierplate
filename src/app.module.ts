import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberModule } from '@domain/member/member.module';
import { FollowModule } from '@domain/follow/follow.module';

import { HelloController } from './application/controller/hello.controller';
import { MemberController } from './application/controller/member.controller';
import { InsertFollowMemberUsecase } from './application/usecase/insert-follow-member.usecase';
import { FollowController } from './application/controller/follow.controller';
import { GetFollowerMembersUsecase } from './application/usecase/get-follower-members.usecase';
import { GetFollowingMembersUsecase } from './application/usecase/get-following-members.usecase';

const AppUseCases = [InsertFollowMemberUsecase, GetFollowerMembersUsecase, GetFollowingMembersUsecase];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATASOURCE_HOST,
      port: +process.env.DATASOURCE_PORT,
      username: process.env.DATASOURCE_USERNAME,
      password: process.env.DATASOURCE_PASSWORD,
      database: process.env.DATASOURCE_DATABASE,
      entities: ['./dist/**/*/entity/*.entity.{js,ts}'],
      synchronize: true,
    }),
    MemberModule,
    FollowModule,
  ],
  controllers: [HelloController, MemberController, FollowController],
  providers: AppUseCases,
})
export class AppModule {}
