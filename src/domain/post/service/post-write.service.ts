import { Injectable } from '@nestjs/common';

import { PostRepository } from '../repository/post.repository';
import { CreatePostCommand } from '../dto/create-post.command';

@Injectable()
export class PostWriteService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(command: CreatePostCommand) {
    await this.postRepository.insert(command.toEntity());
  }
}
