import { Controller, Get } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) { }

	@Get()
	findAll(): Promise<UserDTO[]> {
		return this.userService.findAll();
	}
}
