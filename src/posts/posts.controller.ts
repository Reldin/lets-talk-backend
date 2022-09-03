import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppUser } from 'src/auth/dao/appuser.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Category } from './dao/category.entity';
import { Post } from './dao/post.entity';
import { Topic } from './dao/topic.entity';
import { getCategoryTopics } from './dto/getCategoryTopic';
import { GetTopicWithPostDto } from './dto/getTopicWithPost';
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
  getCategoryTopics(@Param('id') id: number): Promise<GetTopicWithPostDto[]> {
    return this.postsService.getCategoryTopics(id);
  }

  @Delete('/categories/category/:id')
  @UseGuards(AuthGuard())
  deleteCategoryTopic(
    @Param('id') id: number,
    @GetUser() user: AppUser,
  ): Promise<void> {
    return this.postsService.deleteCategoryTopic(id, user);
  }

  @Get('/categories/category/topic/:id')
  getTopicPosts(): Promise<Post[]> {
    return this.postsService.getTopicPosts();
  }

  @Get('/test')
  getSavedPosts(): Promise<any> {
    return this.postsService.getSavedPosts();
  }
}
