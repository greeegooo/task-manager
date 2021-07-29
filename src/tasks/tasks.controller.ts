import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getAll() : Task[] {
        return this.taskService.getAll();
    }

    @Post()
    create(@Body() request: CreateTaskDto) : Task {
        return this.taskService.create(request);
    }
}
