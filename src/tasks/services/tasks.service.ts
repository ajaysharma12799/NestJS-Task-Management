import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../model/task.model';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRepository } from '../repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask: Task = await this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(newTask);

    return newTask;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} is not Present`);
    }

    return found;
  }

  async updateTaskById(id: string, status: TaskStatus): Promise<Task> {
    const found = await this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} is not Present`);
    }

    found.status = status;

    await this.taskRepository.save(found);

    return found;
  }

  async deleteTaskById(id: string): Promise<Task> {
    const found = await this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} is not Present`);
    }

    await this.taskRepository.delete({
      id: found.id,
    });

    return found;
  }
}
