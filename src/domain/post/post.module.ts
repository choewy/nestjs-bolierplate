import { Module } from '@nestjs/common';

import { PostRepository } from './repository/post.repository';
import { PostReadService } from './service/post-read.service';
import { PostWriteService } from './service/post-write.service';

const PostProviders = [PostRepository, PostReadService, PostWriteService];

@Module({
  providers: PostProviders,
  exports: PostProviders,
})
export class PostModule {}
