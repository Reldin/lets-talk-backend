import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [ConfigModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
