import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQuery } from 'mysql2/typings/mysql/lib/Connection';
import { AppUser } from 'src/auth/dao/appuser.entity';
import { Any, Repository } from 'typeorm';
import { Category } from './dao/category.entity';
import { Post } from './dao/post.entity';
import { Topic } from './dao/topic.entity';
import { getCategoryTopics } from './dto/getCategoryTopic';
import { GetTopicWithPostDto } from './dto/getTopicWithPost';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(AppUser)
    private appUserRepository: Repository<AppUser>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryName(id: number): Promise<string> {
    const found = await this.categoryRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException();
    }
    console.log('categoryName ' + found);
    return found.name;
  }

  async getCategoryTopics(categoryId: number): Promise<GetTopicWithPostDto[]> {
    const rawtest = await this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.posts', 'post')
      .limit(5)
      .where('topic.categoryId = :categoryId', { categoryId })
      .getSql();

    console.time('regular');
    const found = await this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.posts', 'post')
      .leftJoinAndSelect('post.appUser', 'appUser')
      .limit(5)
      .where('topic.categoryId = :categoryId', { categoryId })
      .getMany();
    console.timeEnd('regular');
    if (!found) {
      throw new NotFoundException();
    }
    // console.log('topics found ' + JSON.stringify(found));
    return found;
  }

  async getUsername(id: number): Promise<string> {
    const found = await this.appUserRepository
      .createQueryBuilder('appUser')
      .select('appUser.username')
      .where('appUser.id = :id', { id })
      .getOne();
    console.log(found?.username);
    return found!.username;
  }

  /**
   * Deletes a topic in a category by given id.
   * Checks if user that requested the deletion owns that topic.
   * @param id Id of the topic from the frontend
   * @param user get-user decorator "fetches" the AppUser entity automatically
   */
  async deleteCategoryTopic(id: number, user: AppUser): Promise<void> {
    const parsedUser: AppUser = JSON.parse(JSON.stringify(user));

    const foundTopicWithUserId = await this.topicRepository
      .createQueryBuilder('topic')
      .where('topic.appUserId = :appUserId AND topic.id = :id', {
        appUserId: parsedUser.id,
        id,
      })
      .getOne();

    if (!foundTopicWithUserId) {
      throw new NotFoundException();
    }
    this.topicRepository.delete({ id });
  }

  async getTopicPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    console.log(posts);
    return posts;
  }

  async getSavedPosts(): Promise<any> {
    const found = await this.appUserRepository
      .createQueryBuilder('appuser')
      .leftJoinAndSelect('appuser.savedPosts', 'post')
      .where('appuser.id = :id', { id: 1 })
      .getMany();

    console.log(found);
    return found;
  }
}
