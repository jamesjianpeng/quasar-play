import { Injectable, OnModuleInit } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
import { NestjsRdbLibService } from '@smartblog/nestjs-rdb-lib';
import { User } from 'src/entity/user.entity';
import { Collection } from 'mongodb';
import { compare, genSalt, hash } from 'bcryptjs'
import { UserService } from 'src/module/user/user.service'
import { IServerResponse } from 'src/core/interface'
// import { Collection } from 'mongodb';
@Injectable()
export class LoginService implements OnModuleInit {
  private colUser: Collection

  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
    private nestjsRdbLibService: NestjsRdbLibService,
    private userService: UserService,
  ) {}

  onModuleInit () {
    this.init()
  }

  async init () {
    const data = { cliKey: 'sz', db: 'LiveLearn', col: 'user' };
    this.colUser = await this.nestjsMdbLibService.getCol(data);
  }

  async login(user: User): Promise<IServerResponse<null>> {
    let { password } = user;
    const { data: currentUser } = await this.userService.getUser(user)
    password = Buffer.from(password, 'base64').toString()
    const passwordMatch = await compare(password, currentUser.password);
    return passwordMatch ? { msg: '登陆成功' } : { code: 1, msg: '用户名或者密码错误' };
  }

  async logout() {
    return this.nestjsMdbLibService.test();
  }

  async register(user: User): Promise<IServerResponse<User | null>> {
    // 注册账号
    let { password } = user
    password = await this.decryptPassword(password)
    user.password = await this.hashPassword(password)
    const { code, msg, data = {} as User } = await this.userService.addUser(user)
    if (code) {
      return { code, msg: `${data.email}, ${msg}`, }
    }
    return { msg: '注册成功' }
  }

  /**
   * @description 由于这个项目实现登陆的密码是通过 前端abot base64 加密的，先解密
   * @param {string} password
   */
  protected async decryptPassword (password: string): Promise<string> {
    password = Buffer.from(password, 'base64').toString() // 前端通过使用 window.btoa(password) 的方式进行 base64 加密，服务端需要解密再进行 bcryptjs 加密存储
    return password
  }

  /**
   * @description 给密码加盐
   * @param {string} password
   */
  protected async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
}
