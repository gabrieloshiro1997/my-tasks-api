import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
