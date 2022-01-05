import { Controller, Delete, Get, Post, Put, Body } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks(): string {
    return 'Get Tasks';
  }

  @Post()
  createTask(@Body() task): string {
    console.log(task);
    return 'Create Task';
  }

  @Put()
  updateTask(): string {
    return 'Update Task';
  }

  @Delete()
  deleteTask(): string {
    return 'Delete Task';
  }
}
