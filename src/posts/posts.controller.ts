import { Body, Controller, Get, Param } from '@nestjs/common';
import { Category } from './dao/category.entity';
import { Topic } from './dao/topic.entity';
import { getCategoryTopics } from './dto/getCategoryTopic';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.postsService.getAllCategories();
  }

  @Get('/categories/category/:id')
  getCategoryName(@Param('id') id: number): Promise<string> {
    return this.postsService.getCategoryName(id);
  }

  @Get('/categories/:id')
  getCategoryTopics(@Param('id') id: number): Promise<getCategoryTopics[]> {
    return this.postsService.getCategoryTopics(id);
  }
}
