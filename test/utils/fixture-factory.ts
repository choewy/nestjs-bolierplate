import { v4 } from 'uuid';
import { config } from 'dotenv';
import { DateTime } from 'luxon';
import { DataSource, DeepPartial } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { Post } from '@domain/post/entity/post.entity';
import { Member } from '@domain/member/entity/member.entity';

export class FixtureFactory {
  static createDataSource() {
    config({ path: './.env.test' });

    return new DataSource({
      type: 'mysql',
      host: process.env.DATASOURCE_HOST,
      port: +process.env.DATASOURCE_PORT,
      username: process.env.DATASOURCE_USERNAME,
      password: process.env.DATASOURCE_PASSWORD,
      database: process.env.DATASOURCE_DATABASE,
      entities: ['./src/**/*/entity/*.entity.ts'],
    });
  }

  static createMember(plain: DeepPartial<Member> = {}) {
    const nickname = v4().substring(0, 10);

    return plainToInstance(Member, {
      email: [nickname, 'example.com'].join('@'),
      nickname: nickname,
      birthday: new Date(),
      ...plain,
    });
  }

  static createPost(plain: DeepPartial<Post> = {}) {
    return plainToInstance(Post, { contents: v4(), ...plain });
  }

  static getRandomIntByRange(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  static getRandomDateByRange(start: Date, end: Date): Date {
    const s = DateTime.fromJSDate(start);
    const e = DateTime.fromJSDate(end);

    const days = e.diff(s, 'days').get('days');
    const day = Math.round(Math.random() * days);

    return s.plus({ day }).toJSDate();
  }
}
