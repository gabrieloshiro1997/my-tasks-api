import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
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

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipe) updateUserDTO: UpdateUserDTO,
    ): Promise<UserDTO> {
        return await this.userService.update(id, updateUserDTO);
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDTO> {
        return await this.userService.findById(id);
    }
}
