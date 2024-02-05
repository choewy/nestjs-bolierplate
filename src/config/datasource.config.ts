import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DataSourceConfig {
  static get moduleOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATASOURCE_HOST,
      port: +process.env.DATASOURCE_PORT,
      username: process.env.DATASOURCE_USERNAME,
      password: process.env.DATASOURCE_PASSWORD,
      database: process.env.DATASOURCE_DATABASE,
      entities: ['./dist/**/*.entity.{js,ts}'],
    };
  }
}
