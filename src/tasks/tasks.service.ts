import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAll() : Task[] {
        return this.tasks;
    }

    create(request: CreateTaskDto) : Task {

        const { title, description } = request;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }
}
