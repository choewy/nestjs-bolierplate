import { Test } from '@nestjs/testing';

import { mockRepository } from 'test/utils/mock-repository';

import { MemberWriteService } from '@domain/member/service/member-write.service';
import { MemberRepository } from '@domain/member/repository/member.repository';
import { MemberNicknameHistoryRepository } from '@domain/member/repository/member-nickname-history.repository';

describe(MemberWriteService.name, () => {
  let memberWriteService: MemberWriteService;
  let memberRepository: MemberRepository;
  let memberNicknameHistoryRepository: MemberNicknameHistoryRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [MemberWriteService, mockRepository(MemberRepository), mockRepository(MemberNicknameHistoryRepository)],
    }).compile();

    memberWriteService = module.get(MemberWriteService);
    memberRepository = module.get(MemberRepository);
    memberNicknameHistoryRepository = module.get(MemberNicknameHistoryRepository);
  });

  it('MemberWriteService 정의되어 있어야 한다.', () => {
    expect(MemberWriteService).toBeDefined();
  });
});
