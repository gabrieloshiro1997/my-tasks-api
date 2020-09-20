import { Body, Controller, Get, Param, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { Task } from 'src/entity/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAll(): Promise<Task[]> {
        return await this.taskService.findAll();
    }

    @Post(':userId')
    async create(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Body(ValidationPipe) createTaskDTO: CreateTaskDTO,
    ): Promise<Task> {
        return await this.taskService.create(userId, createTaskDTO);
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
        return await this.taskService.findById(id);
    }
}
