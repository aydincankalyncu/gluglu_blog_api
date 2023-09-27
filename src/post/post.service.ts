import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async listAllPosts(): Promise<BaseResult> {
    try {
      const posts: Post[] = await this.postRepository.find({
        relations: ['comments', 'category'],
      });
      return new SuccessResult('All posts have been listed', posts);
    } catch (error) {
      return new ErrorResult(
        'Error occured while retrieving posts' + error,
        error,
      );
    }
  }

  async getPosts(page: string, category: string): Promise<BaseResult> {
    const postPerPage = 2;
    const pageNumber = parseInt(page);
    const skipValue = postPerPage * (pageNumber - 1);
    try {
      // const totalPostCount = await this.postRepository.count();

      // const postList: Post[] = await this.postRepository
      //   .createQueryBuilder('post')
      //   .take(postPerPage)
      //   .skip(skipValue)
      //   .getMany();
      let postQuery = this.postRepository
        .createQueryBuilder('post')
        .take(postPerPage)
        .skip(skipValue);
      if (category !== '') {
        postQuery = postQuery.where('post.categorySlug = :category', {
          category,
        });
      }
      const [postList, totalPostCount] = await postQuery.getManyAndCount();
      return new SuccessResult('Posts listed', {
        postList: postList,
        totalCount: totalPostCount,
      });
    } catch (error) {
      return new ErrorResult('Error occured getting posts ' + error, error);
    }
  }

  async getPost(slug: string): Promise<BaseResult> {
    try {
      const post: Post = await this.postRepository.findOneBy({ slug: slug });
      return new SuccessResult('Post retrieved', post);
    } catch (error) {
      return new ErrorResult('Error occured while getting post' + error, error);
    }
  }
}
