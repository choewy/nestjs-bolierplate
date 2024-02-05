import { plainToInstance } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Member } from '../entity/member.entity';

export class RegistMemberCommand {
  @ApiProperty({ type: String, format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(10)
  readonly nickname: string;

  @ApiProperty({ type: Date, format: 'date' })
  @IsNotEmpty()
  @IsDate()
  readonly birthday: Date;

  toEntity() {
    return plainToInstance(Member, {
      email: this.email,
      nickname: this.nickname,
      birthday: this.birthday,
    });
  }
}
