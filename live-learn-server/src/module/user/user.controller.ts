import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
@Controller('/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() user: User) {
    return this.userService.getUser(user);
  }
}
