import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from 'src/entity/user.entity';
@Controller('/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  login(@Body() user: User) {
    return this.loginService.login(user);
  }

  @Post('/logout')
  testMdb() {
    return this.loginService.logout();
  }

  @Post('/register')
  register(@Body() user: User) {
    return this.loginService.register(user);
  }
}
