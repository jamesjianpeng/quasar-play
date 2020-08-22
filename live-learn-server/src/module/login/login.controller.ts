import { Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  getHello() {
    return this.loginService.login();
  }

  @Post('/logout')
  testMdb() {
    return this.loginService.logout();
  }
}
