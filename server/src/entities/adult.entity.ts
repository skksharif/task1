import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adults')
export class Adults {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
