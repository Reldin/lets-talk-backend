export class GetTopicWithPostDto {
  id: number;

  title: string;

  categoryId: number;

  appUserId: number;

  posts: {
    id: number;

    message: string;

    appUserId: number;

    topicId: number;
  };
}
