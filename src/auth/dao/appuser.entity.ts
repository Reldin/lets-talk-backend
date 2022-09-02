import { Exclude } from 'class-transformer';
import { Post } from 'src/posts/dao/post.entity';
import { Topic } from 'src/posts/dao/topic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appuser')
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  email: string;

  @OneToMany(() => Topic, (topic) => topic.appUser)
  topics: Array<Topic>;

  @OneToMany(() => Post, (post) => post.appUser)
  posts: Array<Post>;
}
