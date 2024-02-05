import { ApiResponseProperty } from '@nestjs/swagger';

import { Follow } from '../entity/follow.entity';

export class FollowDto {
  @ApiResponseProperty({ type: Number })
  readonly id: number;

  @ApiResponseProperty({ type: String })
  readonly email: string;

  @ApiResponseProperty({ type: String })
  readonly nickname: string;

  @ApiResponseProperty({ type: Date, format: 'date-time' })
  readonly createdAt: string;

  constructor(follow: Follow, type: keyof Pick<Follow, 'fromMember' | 'toMember'>) {
    this.id = follow[type].id;
    this.email = follow[type].email;
    this.nickname = follow[type].nickname;
    this.createdAt = follow.createdAtToString();
  }
}
