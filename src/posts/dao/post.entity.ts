import { Exclude } from 'class-transformer';
import { AppUser } from 'src/auth/dao/appuser.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  appUserId: number;

  @Column()
  topicId: number;

  @ManyToOne(() => AppUser, (appUser) => appUser.posts)
  @JoinColumn({ name: 'appUserId' })
  appUser: AppUser;

  @ManyToOne(() => Topic, (topic) => topic.posts)
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @ManyToMany(() => AppUser, (appUser) => appUser.savedPosts, {})
  @JoinTable({
    name: 'SavedPost',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
  })
  appUsers: Array<AppUser>;
}
