import { plainToInstance } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Member } from '../entity/member.entity';

export class RegisterMemberCommand {
  @ApiProperty({ type: String, format: 'email' })
  @IsNotEmpty({ message: '이메일을 입력하세요.' })
  @IsEmail({}, { message: '이메일 형식에 맞지 않습니다.' })
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '닉네임을 입력하세요.' })
  @MaxLength(10, { message: '닉네임은 10자 이내입니다.' })
  readonly nickname: string;

  @ApiProperty({ type: Date, format: 'date' })
  @IsNotEmpty({ message: '생년월일을 입력하세요.' })
  @IsDate({ message: 'YYYY-MM-DD 형식에 맞지 않습니다.' })
  readonly birthday: Date;

  toEntity() {
    return plainToInstance(Member, {
      email: this.email,
      nickname: this.nickname,
      birthday: this.birthday,
    });
  }
}
