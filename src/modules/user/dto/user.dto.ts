import { IsOptional } from 'class-validator';
export class UserDTO {

	@IsOptional()
	id?: number;

	@IsOptional()
	name: string;

	@IsOptional()
	email: string;
}