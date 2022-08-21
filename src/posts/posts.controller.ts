import { Controller, Get } from '@nestjs/common';
import { Category } from './dao/category.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.postsService.getAllCategories();
  }
}
