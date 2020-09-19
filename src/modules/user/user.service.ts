import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<UserDTO[]> {
        return await this.userRepository.find();
    }

    async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
        const { email } = createUserDTO;

        const emailExists = await (await this.userRepository.find({ email })).length;

        if (emailExists) {
            throw new ConflictException('Email already exists');
        }

        return await this.userRepository.save(createUserDTO);
    }
}
