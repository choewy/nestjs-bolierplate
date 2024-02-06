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
      contents: this.contents,
      member: { id: this.memberId },
    });
  }
}
