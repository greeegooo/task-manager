import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor() {}

    @Get()
    getAll() {
        return "Tasks";
    }
}
