import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type => Task,
        task => task.user,
    )
    tasks: Task[];
}
