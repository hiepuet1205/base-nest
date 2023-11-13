import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 }) 
  username: string;

  @Column({ length: 500 }) 
  password: string;
}
