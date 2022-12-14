import { AppUser } from 'src/auth/dao/appuser.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Post } from './post.entity';

@Entity({ name: 'topic' })
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  categoryId: number;

  @Column()
  appUserId: number;

  @ManyToOne(() => Category, (category) => category.topics)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => AppUser, (appUser) => appUser.topics)
  @JoinColumn({ name: 'appUserId' })
  appUser: AppUser;

  @OneToMany(() => Post, (post) => post.topic)
  posts: Array<Post>;
}
