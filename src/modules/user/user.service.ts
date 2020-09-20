import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
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

    async update(id: string, updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
        const { email } = updateUserDTO;

        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const emailRegistered = await this.userRepository.findOne({ email });

        if (emailRegistered) {
            if (emailRegistered.email !== user.email) {
                throw new ConflictException('Email already registered');
            }
        }
        this.userRepository.merge(user, updateUserDTO);

        return this.userRepository.save(user);
    }

    async findById(id: string): Promise<UserDTO> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
