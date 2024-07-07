import { TaskStatus } from '../model/task.model';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
