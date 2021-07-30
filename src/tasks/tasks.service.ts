import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    
    private tasks: Task[] = [];

    getAll() : Task[] {
        return this.tasks;
    }

    getAllWithFilter(filterRequest: GetTasksFilterDto) : Task[] {
        const { search, status } = filterRequest;

        let tasks = this.getAll();
        
        if(status) {
            tasks = tasks.filter(t => t.status === status);
        }

        if(search) {
            tasks = tasks.filter(t => t.title.includes(search) || t.description.includes(search));
        }

        return tasks;
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
