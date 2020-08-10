import { Injectable, OnModuleInit } from '@nestjs/common';
// import { MdbService } from './common/Mdb/MdbService';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib'
@Injectable()
export class AppService implements OnModuleInit {
  constructor (
    // private MdbService: MdbService,
    private nestjsMdbLibService: NestjsMdbLibService
  ) {}

  onModuleInit () {
  }

  // async test () {
  //   const data = { cliKey: 'sz', db:'ghost-live&learn', col: 'subject_sz' }

  //   const col = await this.MdbService.getCol(data)
  //   await col.insertOne({ subject: '数据库概率', code: '02323' })

  //   const dd = { cliKey: 'hk', db:'ghost-live&learn', col: 'subject_hk' }

  //   const colHk = await this.MdbService.getCol(dd)
  //   await colHk.insertOne({ subject: '操作系统概率', code: '02323' })
  //   return Promise.resolve({ hk: await (await colHk.find()).toArray(), sz: await (await col.find()).toArray()})
  // }

  async getHello() {
    // return await this.test()
    return this.nestjsMdbLibService.test()
    // return 'Hello World!';
  }
}
