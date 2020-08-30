import { Injectable } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
@Injectable()
export class LoginService {
  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
  ) {}

  async test() {
    const data = { cliKey: 'sz', db: 'ghost-live&learn', col: 'subject_sz' };

    const col = await this.nestjsMdbLibService.getCol(data);
    await col.insertOne({ subject: '数据库概率', code: '02323' });

    const dd = { cliKey: 'hk', db: 'ghost-live&learn', col: 'subject_hk' };
    const colHk = await this.nestjsMdbLibService.getCol(dd);
    return Promise.resolve({ hk: await (await colHk.find()).toArray(), sz: await (await col.find()).toArray()});
  }

  async login() {
    return 'Hello World!';
  }

  async logout() {
    return this.nestjsMdbLibService.test();
  }

  async register() {
    // 注册账号
    return 'register';
  }
}
