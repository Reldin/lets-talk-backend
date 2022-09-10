import { AppUser } from 'src/auth/dao/appuser.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  appUserId: number;

  @ManyToOne(() => AppUser, (appUser) => appUser.posts)
  @JoinColumn({ name: 'appUserId' })
  appUser: AppUser;

  @OneToMany(() => Topic, (topic) => topic.category)
  topics: Array<Topic>;
}
