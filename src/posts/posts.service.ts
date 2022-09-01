import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUser } from 'src/auth/dao/appuser.entity';
import { Repository } from 'typeorm';
import { Category } from './dao/category.entity';
import { Topic } from './dao/topic.entity';
import { getCategoryTopics } from './dto/getCategoryTopic';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
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

  async getCategoryTopics(categoryId: number): Promise<getCategoryTopics[]> {
    const topics: getCategoryTopics[] = [];

    const found = await this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.category', 'category')
      .where('topic.categoryId = :categoryId', { categoryId })
      .getMany();
    if (!found) {
      throw new NotFoundException();
    }

    console.log('topics found ' + JSON.stringify(found));

    found.forEach((data) => {
      topics.push({
        id: data.id,
        title: data.title,
        name: data.category.name,
      });
    });
    console.log('Topics ' + JSON.stringify(topics));
    return topics;
  }

  async deleteCategoryTopic(id: number, user: AppUser): Promise<void> {
    console.log(JSON.stringify(user) + '' + id);
    this.topicRepository.delete({ id });
  }
}
