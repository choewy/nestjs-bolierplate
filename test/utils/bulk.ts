import { DataSource } from 'typeorm';

import { Estimator } from './extimator';
import { FixtureFactory } from './fixture-factory';

import { MemberRepository } from '@domain/member/repository/member.repository';
import { PostRepository } from '@domain/post/repository/post.repository';
import { Post } from '@domain/post/entity/post.entity';
import { Member } from '@domain/member/entity/member.entity';

export class Bulk {
  static readonly TIMEOUT = 60000 * 5;

  static readonly MEMBER_COUNT = 10;
  static readonly POST_COUNT = 1000000;

  static readonly START_DATE = new Date('2023-01-01');
  static readonly END_DATE = new Date('2023-12-31');

  static async insertMembers(dataSource: DataSource) {
    const createResult = Estimator.fn(() => {
      const entities: Member[] = [];

      for (let i = 0; i < this.MEMBER_COUNT; i++) {
        const createdAt = FixtureFactory.getRandomDateByRange(this.START_DATE, this.END_DATE);

        entities.push(FixtureFactory.createMember({ createdAt }));
      }

      return entities;
    });

    console.log(`create member entities ${createResult.milliseconds}ms`);

    const memberRepository = new MemberRepository(dataSource);
    const insertResult = await Estimator.promise(async () => {
      await memberRepository.insert(createResult.returnValue);
    });

    console.log(`complete insert members ${insertResult.milliseconds}ms`);
  }

  static async insertPosts(dataSource: DataSource) {
    const createResult = Estimator.fn(() => {
      const entities: Post[] = [];

      for (let i = 0; i <= this.POST_COUNT; i++) {
        const memberId = FixtureFactory.getRandomIntByRange(1, this.MEMBER_COUNT);
        const createdAt = FixtureFactory.getRandomDateByRange(this.START_DATE, this.END_DATE);

        entities.push(FixtureFactory.createPost({ member: { id: memberId }, date: createdAt, createdAt }));
      }

      return entities;
    });

    console.log(`create post entities ${createResult.milliseconds}ms`);

    const postRepository = new PostRepository(dataSource);
    const insertResult = await Estimator.promise(async () => {
      while (true) {
        const rows = createResult.returnValue.splice(0, 10000);

        if (rows.length === 0) {
          break;
        }

        await postRepository.insert(rows);
      }
    });

    console.log(`complete insert posts ${insertResult.milliseconds}ms`);
  }
}
