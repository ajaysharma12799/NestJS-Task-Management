import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../model/task.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  title: string;

  @Column({})
  description: string;

  @Column({})
  status: TaskStatus;
}
