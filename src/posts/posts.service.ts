import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './dao/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
