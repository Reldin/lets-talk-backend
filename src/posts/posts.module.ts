import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './dao/category.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Category])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
