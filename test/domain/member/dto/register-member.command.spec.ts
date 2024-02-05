import { v4 } from 'uuid';
import { ValidationError } from 'class-validator';

import { ClassValidator } from 'test/utils/class-validator';

import { RegisterMemberCommand } from '@domain/member/dto/register-member.command';

describe('RegisterMemberCommand', () => {
  it('이메일을 반드시 입력해야 한다.', () => {
    const result = ClassValidator.validate(RegisterMemberCommand);

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('email');
  });

  it('이메일은 이메일 형식에 맞아야 한다.', () => {
    const result = ClassValidator.validate(RegisterMemberCommand, {
      email: 'hello',
    });

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('email');
  });

  it('닉네임을 반드시 입력해야 한다.', () => {
    const result = ClassValidator.validate(RegisterMemberCommand, {
      email: 'user@example.com',
    });

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('nickname');
  });

  it('닉네임은 10자 이내로 입력해야 한다.', () => {
    const result = ClassValidator.validate(RegisterMemberCommand, {
      email: 'user@example.com',
      nickname: v4(),
    });

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('nickname');
  });

  it('생년월일을 반드시 입력해야 한다.', () => {
    const result = ClassValidator.validate(RegisterMemberCommand, {
      email: 'user@example.com',
      nickname: v4().substring(0, 10),
    });

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('birthday');
  });

  it('생년월일은 Date 객체로 변환될 수 있어야 한다.', () => {
    const result = ClassValidator.validate(RegisterMemberCommand, {
      email: 'user@example.com',
      nickname: v4().substring(0, 10),
      birthday: new Date('20230120'),
    });

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('birthday');
  });

  it('올바른 데이터를 입력했을 때 유효성 검사에 통과하여야 한다.', () => {
    const result = ClassValidator.validate(RegisterMemberCommand, {
      email: 'user@example.com',
      nickname: v4().substring(0, 10),
      birthday: new Date(),
    });

    expect(result).toBeNull();
  });
});
