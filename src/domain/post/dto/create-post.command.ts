import { DeepPartial } from 'typeorm';
import { IsInt, IsNotEmpty, Min, MinLength } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { Post } from '../entity/post.entity';

export class CreatePostCommand {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly memberId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(1)
  readonly contents: string;

  toEntity() {
    return plainToInstance(Post, {
      member: { id: this.memberId },
      contents: this.contents,
      createDate: new Date(),
    } as DeepPartial<Post>);
  }
}
