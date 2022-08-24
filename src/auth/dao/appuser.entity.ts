import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
