import { Module } from '@nestjs/common';

import { PostRepository } from './repository/post.repository';
import { PostWriteService } from './service/post-write.service';

const PostProviders = [PostRepository, PostWriteService];

@Module({
  providers: PostProviders,
  exports: PostProviders,
})
export class PostModule {}
