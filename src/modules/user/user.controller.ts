import { Body, Controller, Get, Param, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<UserDTO[]> {
        return this.userService.findAll();
    }

    @Post()
    async create(@Body(ValidationPipe) createUserDTO: CreateUserDTO): Promise<UserDTO> {
        return this.userService.create(createUserDTO);
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDTO> {
        return await this.userService.findById(id);
    }
}
