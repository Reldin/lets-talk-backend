import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getGame() {
    return ['test', 'test2'];
  }
}
