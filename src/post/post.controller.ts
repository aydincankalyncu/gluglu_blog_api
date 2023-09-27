import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { BaseResult } from 'src/utils/result/base-result';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list')
  async listAllPosts(): Promise<BaseResult> {
    return this.postService.listAllPosts();
  }

  @Get()
  async getPosts(
    @Query('page') page: string,
    @Query('cat') category: string,
  ): Promise<BaseResult> {
    return this.postService.getPosts(page, category);
  }

  @Get(':id')
  async getPost(@Param('id') slug: string): Promise<BaseResult>{
    return this.postService.getPost(slug);
  }
}
