import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule, TypeOrmConfigService } from './configs';

@Module({
  imports: [
    ConfigsModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigsModule.forFeature([TypeOrmConfigService])],
      inject: [TypeOrmConfigService],
      useFactory(typeOrmConfigService: TypeOrmConfigService) {
        return typeOrmConfigService.changeValue('TYPEORM_SHYNCHRONIZE', true).getTypeOrmOptions();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
