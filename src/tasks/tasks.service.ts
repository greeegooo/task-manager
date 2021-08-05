import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  @InjectRepository(TaskRepository)
  private taskRepository: TaskRepository;

  // getAll() : Task[] {
  //     return this.tasks;
  // }

  // getAllWithFilter(filterRequest: GetTasksFilterDto) : Task[] {
  //     const { search, status } = filterRequest;

  //     let tasks = this.getAll();

  //     if(status) {
  //         tasks = tasks.filter(t => t.status === status);
  //     }

  //     if(search) {
  //         tasks = tasks.filter(t => t.title.includes(search) || t.description.includes(search));
  //     }

  //     return tasks;
  // }

  async get(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with id "${id}" not found`);
    return found;
  }

  create(request: CreateTaskDto): Promise<Task> {
    return this.taskRepository.add(request);
  }

  // update(id: string, status: TaskStatus) : Task {
  //     let task = this.get(id);

  //     task.status = status;

  //     return task;
  // }

  async delete(id: string) : Promise<void> {

      const result = this.taskRepository.delete(id);

      if((await result).affected === 0)
        throw new NotFoundException(`Task with id "${id}" not found`);
  }
}
