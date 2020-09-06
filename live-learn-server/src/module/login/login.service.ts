import { Injectable } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
import { NestjsRdbLibService } from '@smartblog/nestjs-rdb-lib';
import { User } from 'src/entity/user.entity';
@Injectable()
export class LoginService {
  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
    private nestjsRdbLibService: NestjsRdbLibService,
  ) {}

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
    return 'Hello World!';
  }

  async logout() {
    return this.nestjsMdbLibService.test();
  }

  async register(user: User) {
    // 注册账号
    return Promise.resolve('register');
  }
}
