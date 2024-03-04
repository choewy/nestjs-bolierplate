import { DynamicModule, Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class ConfigExModule {
  static forRoot(): DynamicModule {
    return {
      imports: [ConfigModule.forRoot()],
      module: ConfigExModule,
      global: true,
    };
  }

  static forFeature(services: Type<any>[]): DynamicModule {
    return {
      module: ConfigExModule,
      providers: services,
      exports: services,
    };
  }
}
