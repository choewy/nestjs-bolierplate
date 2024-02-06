import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberModule } from '@domain/member/member.module';
import { FollowModule } from '@domain/follow/follow.module';
import { PostModule } from '@domain/post/post.module';

import { HelloController } from '@application-controllers/hello.controller';
import { MemberController } from '@application-controllers/member.controller';
import { FollowController } from '@application-controllers/follow.controller';
import { PostController } from '@application-controllers/post.controller';

import { GetFollowerMembersUsecase } from '@application-usecases/get-follower-members.usecase';
import { GetFollowingMembersUsecase } from '@application-usecases/get-following-members.usecase';
import { InsertFollowMemberUsecase } from '@application-usecases/insert-follow-member.usecase';
import { InsertPostUsecase } from '@application-usecases/insert-post.usecase';

const AppUseCaseses = [InsertFollowMemberUsecase, GetFollowerMembersUsecase, GetFollowingMembersUsecase, InsertPostUsecase];
const AppControllers = [HelloController, MemberController, FollowController, PostController];

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
    PostModule,
  ],
  controllers: AppControllers,
  providers: AppUseCaseses,
})
export class AppModule {}
