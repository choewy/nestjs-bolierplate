import { Injectable, NotFoundException } from '@nestjs/common';

import { PostWriteService } from '@domain/post/service/post-write.service';
import { MemberReadService } from '@domain/member/service/member-read.service';
import { CreatePostCommand } from '@domain/post/dto/insert-post.command';

@Injectable()
export class InsertPostUsecase {
  constructor(private readonly memberReadService: MemberReadService, private readonly postWriteService: PostWriteService) {}

  async execute(command: CreatePostCommand) {
    const member = await this.memberReadService.getMember(command.memberId);

    if (member == null) {
      throw new NotFoundException();
    }

    await this.postWriteService.createPost(command);
  }
}
