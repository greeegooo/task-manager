import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  @InjectRepository(TaskRepository)
  private taskRepository: TaskRepository;

  async getAll(filter: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getAll(filter, user);
  }

  async get(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({id, user});
    if (!found) throw new NotFoundException(`Task with id "${id}" not found`);
    return found;
  }

  create(request: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.add(request, user);
  }

  async update(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.get(id, user);

    task.status = status;

    await this.taskRepository.save(task);

    return task;
  }

  async delete(id: string, user: User): Promise<void> {
    const result = this.taskRepository.delete({id, user});

    if ((await result).affected === 0)
      throw new NotFoundException(`Task with id "${id}" not found`);
  }
}
