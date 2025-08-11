import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('children')
export class Children {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
