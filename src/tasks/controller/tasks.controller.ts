import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  getAllTask(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param() params): Promise<Task> {
    const { id } = params;

    return this.tasksService.getTaskById(id);
  }

  @Post('/')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTaskById(
    @Param() params,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { id } = params;
    const { status } = updateTaskDto;

    return this.tasksService.updateTaskById(id, status);
  }

  @Delete('/:id')
  deleteTaskById(@Param() params): Promise<Task> {
    const { id } = params;

    return this.tasksService.deleteTaskById(id);
  }
}
