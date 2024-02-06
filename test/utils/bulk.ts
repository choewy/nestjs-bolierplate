import { DataSource } from 'typeorm';

import { Estimator } from './extimator';
import { FixtureFactory } from './fixture-factory';

import { MemberRepository } from '@domain/member/repository/member.repository';
import { PostRepository } from '@domain/post/repository/post.repository';
import { Post } from '@domain/post/entity/post.entity';
import { Member } from '@domain/member/entity/member.entity';

export class Bulk {
  static readonly TIMEOUT = 60000 * 5;
  static readonly COUNT = 10000;
  static readonly DIVIER = 100;
  static readonly MAX = this.COUNT * this.DIVIER;
  static readonly START_DATE = new Date('2023-01-01');
  static readonly END_DATE = new Date('2023-12-31');

  static async insertMembers(dataSource: DataSource) {
    const createResult = Estimator.fn(() => {
      const entities: Member[] = [];

      for (let i = 0; i < this.MAX; i++) {
        const createdAt = FixtureFactory.getRandomDateByRange(this.START_DATE, this.END_DATE);

        entities.push(FixtureFactory.createMember({ createdAt }));
      }

      return entities;
    });

    console.log(`create member entities ${createResult.milliseconds}ms`);

    const memberRepository = new MemberRepository(dataSource);
    const insertResult = await Estimator.promise(async () => {
      for (let i = 0; i < this.DIVIER; i++) {
        await memberRepository.insert(createResult.returnValue.splice(0, this.COUNT));
      }
    });

    console.log(`complete insert members ${insertResult.milliseconds}ms`);
  }

  static async insertPosts(dataSource: DataSource) {
    const createResult = Estimator.fn(() => {
      const entities: Post[] = [];

      for (let i = 0; i <= this.MAX; i++) {
        const memberId = FixtureFactory.getRandomIntByRange(1, this.MAX);
        const createdAt = FixtureFactory.getRandomDateByRange(this.START_DATE, this.END_DATE);

        entities.push(FixtureFactory.createPost({ member: { id: memberId }, createdAt }));
      }

      return entities;
    });

    console.log(`create post entities ${createResult.milliseconds}ms`);

    const postRepository = new PostRepository(dataSource);
    const insertResult = await Estimator.promise(async () => {
      for (let i = 0; i < this.DIVIER; i++) {
        await postRepository.insert(createResult.returnValue.splice(0, this.COUNT));
      }
    });

    console.log(`complete insert posts ${insertResult.milliseconds}ms`);
  }
}
