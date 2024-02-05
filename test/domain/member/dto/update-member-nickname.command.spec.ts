import { v4 } from 'uuid';
import { ValidationError } from 'class-validator';

import { ClassValidator } from 'test/utils/class-validator';

import { UpdateMemberNicknameCommand } from '@domain/member/dto/update-member.command';

describe(UpdateMemberNicknameCommand.name, () => {
  it('닉네임을 반드시 입력해야 한다.', () => {
    const result = ClassValidator.validate(UpdateMemberNicknameCommand);

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('nickname');
  });

  it('닉네임은 10자 이내로 입력해야 한다.', () => {
    const result = ClassValidator.validate(UpdateMemberNicknameCommand, {
      nickname: v4(),
    });

    expect(result).toBeInstanceOf(ValidationError);
    expect(result.property).toEqual('nickname');
  });

  it('올바른 데이터를 입력했을 때 유효성 검사에 통과하여야 한다.', () => {
    const result = ClassValidator.validate(UpdateMemberNicknameCommand, {
      nickname: v4().substring(0, 10),
    });

    expect(result).toBeNull();
  });
});
