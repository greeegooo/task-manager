import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAll() : Task[] {
        return this.tasks;
    }

    get(id: string) : Task {
        return this.tasks.find(t => t.id === id);
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

    update(id: string, status: TaskStatus) : Task {
        let task = this.get(id);

        task.status = status;

        return task;
    }

    delete(id: string) : void{
        this.tasks = this.tasks.filter(t => t.id !== id);
    }
}
