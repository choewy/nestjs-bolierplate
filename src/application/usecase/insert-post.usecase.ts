import { Injectable } from '@nestjs/common';

import { PostWriteService } from '@domain/post/service/post-write.service';
import { MemberReadService } from '@domain/member/service/member-read.service';
import { CreatePostCommand } from '@domain/post/dto/create-post.command';

@Injectable()
export class InsertPostUsecase {
  constructor(private readonly memberReadService: MemberReadService, private readonly postWriteService: PostWriteService) {}

  async execute(command: CreatePostCommand) {
    await this.memberReadService.hasMember(command.memberId);
    await this.postWriteService.createPost(command);
  }
}
