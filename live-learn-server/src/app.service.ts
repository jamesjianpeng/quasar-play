import { Injectable, OnModuleInit } from '@nestjs/common';
import { MdbService } from './common/Mdb/MdbService';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib/dist'
@Injectable()
export class AppService implements OnModuleInit {
  constructor (
    private MdbService: MdbService,
    private nestjsMdbLibService: NestjsMdbLibService
  ) {}

  onModuleInit () {
  }

  async test () {
    const data = { cliKey: 'sz', db:'ghost-live&learn', col: 'subject_sz' }

    const col = await this.MdbService.getCol(data)
    await col.insertOne({ subject: '数据库概率', code: '02323' })

    const dd = { cliKey: 'hk', db:'ghost-live&learn', col: 'subject_hk' }
    const colHk = await this.MdbService.getCol(dd)
    return Promise.resolve({ hk: await (await colHk.find()).toArray(), sz: await (await col.find()).toArray()})
  }

  async getHello() {
    return 'Hello World!';
  }

  async testLib () {
    return this.nestjsMdbLibService.test() 
  }

  async testMdb() {
    return await this.test()
  }
}
