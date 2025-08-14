import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('processing')
export class Processing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
