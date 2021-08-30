import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAll(filter: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filter;
    const qry = this.createQueryBuilder('task');

    qry.where({user});

    if (status) {
      qry.andWhere('task.status = :status', { status });
    }

    if (search) {
      qry.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return await qry.getMany();
  }

  async add(request: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = request;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    await this.save(task);

    return task;
  }
}
