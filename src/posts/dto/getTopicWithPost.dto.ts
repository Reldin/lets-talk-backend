import { AppUser } from 'src/auth/dao/appuser.entity';

export class GetTopicWithPostDto {
  id: number;

  title: string;

  categoryId: number;

  appUserId: number;

  appUser: {
    username: string;
  };

  posts: {
    id: number;

    message: string;

    appUserId: number;

    topicId: number;
  }[];
}
