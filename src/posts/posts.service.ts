import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUser } from 'src/auth/dao/appuser.entity';
import { Repository } from 'typeorm';
import { Category } from './dao/category.entity';
import { Post } from './dao/post.entity';
import { Topic } from './dao/topic.entity';
import { GetTopicWithPostDto } from './dto/getTopicWithPost';
import { NewCategoryDto } from './dto/new-category.dto';
import { NewPostDto } from './dto/new-post.dto';

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
    const found = await this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.posts', 'post')
      .leftJoinAndSelect('post.appUser', 'appUser')
      .where('topic.categoryId = :categoryId', { categoryId })
      .getMany();
    if (!found) {
      throw new NotFoundException();
    }
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

  async addPost(newPost: NewPostDto, user: AppUser): Promise<void> {
    const { topicId, message } = newPost;
    const { id } = user;
    const result = await this.postRepository.save({
      appUserId: id,
      topicId,
      message,
    });

    if (!result) {
      return; // Should throw an error if failure?
    }

    // return the new post, so it can be added to the posts array locally?
    // If username is known in frontend, doesn't really need to return it.
  }

  async addCategory(newCategory: NewCategoryDto, user: AppUser): Promise<void> {
    const { name } = newCategory;
    const { id } = user;
    if (await this.getCategoryByName(name)) {
      throw new ConflictException('Category already exists');
    }
    const result = await this.categoryRepository.save({
      name,
      appUserId: id,
    });

    if (!result) {
      return; // Should throw an error if failure?
    }
  }

  async getCategoryByName(name: string): Promise<boolean> {
    const found = await this.categoryRepository.findOne({ where: { name } });
    if (!found) return false;
    return true;
  }
}
