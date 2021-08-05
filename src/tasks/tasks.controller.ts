import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // @Get()
  // getAll(@Query() filterRequest: GetTasksFilterDto) : Task[] {

  //     return Object.keys(filterRequest).length ?
  //         this.taskService.getAllWithFilter(filterRequest) :
  //         this.taskService.getAll();
  // }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<Task> {
    return this.taskService.get(id);
  }

  @Post()
  async create(@Body() request: CreateTaskDto): Promise<Task> {
    return this.taskService.create(request);
  }

  // @Patch('/:id/status')
  // update(
  //     @Param('id') id: string,
  //     @Body() updateRequest: UpdateTaskStatusDto) : Task {
  //     const { status } = updateRequest;
  //     return this.taskService.update(id, status);
  // }

  // @Delete('/:id')
  // delete(@Param('id') id: string) : void {
  //     return this.taskService.delete(id);
  // }
}
