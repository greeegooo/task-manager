import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getAll() : Task[] {
        return this.taskService.getAll();
    }

    @Get('/:id')
    get(@Param('id') id: string) : Task {
        return this.taskService.get(id);
    }

    @Post()
    create(@Body() request: CreateTaskDto) : Task {
        return this.taskService.create(request);
    }

    @Patch('/:id/status')
    update(
        @Param('id') id: string, 
        @Body('status') status: TaskStatus) : Task {
        return this.taskService.update(id, status);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) : void {
        return this.taskService.delete(id);
    }
}
