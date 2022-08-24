import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './dao/category.entity';
import { Topic } from './dao/topic.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Category, Topic])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
