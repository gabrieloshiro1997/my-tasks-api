import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly userService: UserService,
    ) {}

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async create(userId: string, createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDTO;

        const user = await this.userService.findById(userId);

        const newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.user = user;

        return await this.taskRepository.save(newTask);
    }

    async findById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }
}
