import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks(): { message: string } {
    return { message: 'Ok' };
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

  @Delete(':id')
  deleteTask(@Param('id') id): string {
    console.log(id);
    return `Delete Task number ${id}`;
  }
}
