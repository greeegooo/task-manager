import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(
    private readonly taskService: TasksService) {}

  @Get()
  getAll(
    @Query() filterRequest: GetTasksFilterDto,
    @GetUser() user: User): Promise<Task[]> {
    
    this.logger.log(`User "${user.username}" retrieving all tasks`);
    return this.taskService.getAll(filterRequest, user);
  }

  @Get('/:id')
  get(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.get(id, user);
  }

  @Post()
  create(
    @Body() request: CreateTaskDto,
    @GetUser() user: User): Promise<Task> {
    return this.taskService.create(request, user);
  }

  @Patch('/:id/status')
  update(
    @Param('id') id: string,
    @Body() updateRequest: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateRequest;
    return this.taskService.update(id, status, user);
  }

  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @GetUser() user: User): Promise<void> {
    return this.taskService.delete(id, user);
  }
}
