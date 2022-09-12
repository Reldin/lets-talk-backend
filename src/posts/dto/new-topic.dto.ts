import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class NewTopicDto {
  categoryId: number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  title: string;
}
