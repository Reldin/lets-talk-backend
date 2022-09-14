import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class NewCategoryDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;
}
