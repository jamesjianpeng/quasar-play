import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserService } from 'src/module/user/user.service'
import { TokenService } from 'src/module/login/token.service';
@Module({
  controllers: [LoginController],
  providers: [LoginService, UserService, TokenService],
})
export class LoginModule {}
