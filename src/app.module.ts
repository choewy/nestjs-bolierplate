import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSourceConfig } from './config/datasource.config';
import { MemberModule } from '@domain/member/member.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(DataSourceConfig.moduleOptions), MemberModule],
  controllers: [AppController],
})
export class AppModule {}
