import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppUser } from 'src/auth/dao/appuser.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Category } from './dao/category.entity';
import { Post as post } from './dao/post.entity';
import { GetTopicWithPostDto } from './dto/getTopicWithPost';
import { NewCategoryDto } from './dto/new-category.dto';
import { NewPostDto } from './dto/new-post.dto';
import { NewTopicDto } from './dto/new-topic.dto';
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
  getTopicPosts(): Promise<post[]> {
    return this.postsService.getTopicPosts();
  }

  @Get('/savedposts')
  getSavedPosts(): Promise<any> {
    return this.postsService.getSavedPosts();
  }

  @Post('/post')
  @UseGuards(AuthGuard())
  addPost(
    @Body() newPost: NewPostDto,
    @GetUser() user: AppUser,
  ): Promise<void> {
    return this.postsService.addPost(newPost, user);
  }

  @Post('/categories/category')
  @UseGuards(AuthGuard())
  addCategory(
    @Body() newCategory: NewCategoryDto,
    @GetUser() user: AppUser,
  ): Promise<void> {
    return this.postsService.addCategory(newCategory, user);
  }

  @Post('/categories/category/topic')
  @UseGuards(AuthGuard())
  addTopic(
    @Body() newTopic: NewTopicDto,
    @GetUser() user: AppUser,
  ): Promise<void> {
    return this.postsService.addTopic(newTopic, user);
  }
}
