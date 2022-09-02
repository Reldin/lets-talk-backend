import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AppUser } from 'src/auth/dao/appuser.entity';
import { Category } from './dao/category.entity';
import { Topic } from './dao/topic.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Category, Topic, AppUser]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
