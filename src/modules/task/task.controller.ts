import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { Task } from 'src/entity/task.entity';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

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

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipe) updateTaskDTO: UpdateTaskDTO,
    ): Promise<Task> {
        return this.taskService.update(id, updateTaskDTO);
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.taskService.delete(id);
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
        return await this.taskService.findById(id);
    }
}
