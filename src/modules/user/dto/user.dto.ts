import { IsOptional } from 'class-validator';
export class UserDTO {
    @IsOptional()
    id?: string;

    @IsOptional()
    name: string;

    @IsOptional()
    email: string;
}
