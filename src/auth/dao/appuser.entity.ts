import { Topic } from 'src/posts/dao/topic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appuser')
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Topic, (topic) => topic.appUser)
  topics: Array<Topic>;
}
