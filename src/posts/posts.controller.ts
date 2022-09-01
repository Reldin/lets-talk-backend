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

  @Delete('/categories/category/:id')
  @UseGuards(AuthGuard())
  deleteCategoryTopic(
    @Param('id') id: number,
    @GetUser() user: AppUser,
  ): Promise<void> {
    // console.log(req.headers['authorization']);
    // console.log(req);
    console.log(user);
    return this.postsService.deleteCategoryTopic(id, user);
  }
}
