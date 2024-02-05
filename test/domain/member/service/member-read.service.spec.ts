import { plainToInstance } from 'class-transformer';

import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { mockRepository } from 'test/utils/mock-repository';

import { MemberNicknameHistoryRepository } from '@domain/member/repository/member-nickname-history.repository';
import { MemberRepository } from '@domain/member/repository/member.repository';
import { MemberReadService } from '@domain/member/service/member-read.service';
import { MemberNicknameHistoryDto } from '@domain/member/dto/member-nickname-history.dto';
import { Member } from '@domain/member/entity/member.entity';
import { MemberDto } from '@domain/member/dto/member.dto';

describe(MemberReadService.name, () => {
  let memberReadService: MemberReadService;
  let memberRepository: MemberRepository;
  let memberNicknameHistoryRepository: MemberNicknameHistoryRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [MemberReadService, mockRepository(MemberRepository), mockRepository(MemberNicknameHistoryRepository)],
    }).compile();

    memberReadService = module.get(MemberReadService);
    memberRepository = module.get(MemberRepository);
    memberNicknameHistoryRepository = module.get(MemberNicknameHistoryRepository);
  });

  it('memberReadService가 정의되어 있어야 한다.', () => {
    expect(memberReadService).toBeDefined();
  });

  it('member를 찾을 수 없는 경우 NotFoundException을 throw 한다.', () => {
    jest.spyOn(memberRepository, 'findById').mockImplementation(async () => null);

    expect(memberReadService.getMember(1)).rejects.toThrow(NotFoundException);
  });

  it('member를 찾은 경우 MemberDto을 반환한다.', () => {
    jest.spyOn(memberRepository, 'findById').mockImplementation(async () =>
      plainToInstance(Member, {
        id: 1,
        email: 'user@example.com',
        nickname: 'test',
        birthday: new Date(),
      }),
    );

    expect(memberReadService.getMember(1)).resolves.toBeInstanceOf(MemberDto);
  });

  it('member의 nickname 변경 이력 조회 시 member가 존재하지 않으면 NotFoundException을 throw 한다.', () => {
    jest.spyOn(memberRepository, 'existsById').mockImplementation(async () => false);

    expect(memberReadService.getMemberNicknameHistories(1)).rejects.toThrow(NotFoundException);
  });

  it('member의 nickname 변경 이력 조회에 성공한 경우 Array<MemberNicknameHistoryDto>를 반환한다.', () => {
    jest.spyOn(memberRepository, 'existsById').mockImplementation(async () => true);
    jest.spyOn(memberNicknameHistoryRepository, 'findByMemberId').mockImplementation(async () => []);

    expect(memberReadService.getMemberNicknameHistories(1)).resolves.toBeInstanceOf(Array<MemberNicknameHistoryDto>);
  });
});
