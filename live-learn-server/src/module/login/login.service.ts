import { Injectable, OnModuleInit } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
import { NestjsRdbLibService } from '@smartblog/nestjs-rdb-lib';
import { User } from 'src/entity/user.entity';
import { Collection } from 'mongodb';
import { compare, genSalt, hash } from 'bcryptjs'
// import { Collection } from 'mongodb';
@Injectable()
export class LoginService implements OnModuleInit {
  private colUser: Collection

  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
    private nestjsRdbLibService: NestjsRdbLibService,
  ) {}

  onModuleInit () {
    this.init()
  }

  async init () {
    const data = { cliKey: 'sz', db: 'LiveLearn', col: 'user' };
    this.colUser = await this.nestjsMdbLibService.getCol(data);
  }

  async test() {
    const data = { cliKey: 'sz', db: 'ghost-live&learn', col: 'subject_sz' };

    const col = await this.nestjsMdbLibService.getCol(data);
    await col.insertOne({ subject: '数据库概率', code: '02323' });

    const dd = { cliKey: 'hk', db: 'ghost-live&learn', col: 'subject_hk' };
    const colHk = await this.nestjsMdbLibService.getCol(dd);

    const redis2Value =  await this.nestjsRdbLibService.toPromiseRes({ key: 'sz_2', api: 'get', opt: ['helloKey'] })
    return Promise.resolve({ hk: await (await colHk.find()).toArray(), sz: await (await col.find()).toArray(), redis2Value});
  }

  async login() {
    this.test()
    return 'Hello World!';
  }

  async logout() {
    return this.nestjsMdbLibService.test();
  }

  async register(user: User) {
    // 注册账号
    console.log(await( await this.colUser.find()).toArray())
    const currentUser = this.colUser.findOne({ email: user.email })
    if (!currentUser) {
      return Promise.reject('改用户已经存在')
    }
    user.password = Buffer.from(user.password, 'base64').toString() // 前端通过使用 window.btoa(password) 的方式进行 base64 加密，服务端需要解密再进行 bcryptjs 加密存储
    user.password = await this.hashPassword(user.password)
    this.colUser.insertOne(user)
    return Promise.resolve(user);
  }

  protected async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
}
