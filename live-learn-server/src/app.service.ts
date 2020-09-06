import { Injectable } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
import { NestjsLoggerLibService } from './core/nestjs-logger-lib';
import { NestjsRdbLibService } from '@smartblog/nestjs-rdb-lib';
@Injectable()
export class AppService {
  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
    private nestjsRdbLibService: NestjsRdbLibService,
    private nestjsLoggerLibService: NestjsLoggerLibService,
  ) {}

  async test() {
    const data = { cliKey: 'sz', db: 'ghost-live&learn', col: 'subject_sz' };

    const col = await this.nestjsMdbLibService.getCol(data);
    await col.insertOne({ subject: '数据库概率', code: '02323' });

    const dd = { cliKey: 'hk', db: 'ghost-live&learn', col: 'subject_hk' };
    const colHk = await this.nestjsMdbLibService.getCol(dd);

    const redis2Value =  await this.nestjsRdbLibService.toPromiseRes({ key: 'sz_2', api: 'get', opt: ['helloKey'] })
    return Promise.resolve({ hk: await (await colHk.find()).toArray(), redis2Value, sz: await (await col.find()).toArray()});
  }

  async getHello() {
    this.nestjsLoggerLibService.log('hello', new Date().getTime().toString());
    return 'Hello World!';
  }

  async testLib() {
    return this.nestjsMdbLibService.test();
  }

  async testMdb() {
    return await this.test();
  }
}
