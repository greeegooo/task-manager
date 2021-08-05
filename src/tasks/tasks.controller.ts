import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAll(@Query() filterRequest: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getAll(filterRequest);
  }

  @Get('/:id')
  get(@Param('id') id: string): Promise<Task> {
    return this.taskService.get(id);
  }

  @Post()
  create(@Body() request: CreateTaskDto): Promise<Task> {
    return this.taskService.create(request);
  }

  @Patch('/:id/status')
  update(
    @Param('id') id: string,
    @Body() updateRequest: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateRequest;
    return this.taskService.update(id, status);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
}
