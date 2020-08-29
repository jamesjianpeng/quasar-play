import { Injectable } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';

import { QUEUE_NAME_UPLOAD, QUEUE_HANDLE_UPLOAD } from './constants';
import { IAddOpt } from './interface';
import { Queue, Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import moment from 'moment';

@Injectable()
export class UploadService {
  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
    @InjectQueue(QUEUE_NAME_UPLOAD) private uploadFileQueue: Queue,
  ) {}

  async add({ name, data, options = {} }: IAddOpt): Promise<Job> {
    options = { attempts: 2, ...options };
    return await this.uploadFileQueue.add(name, data, options);
  }

  async test() {
    const data = { cliKey: 'sz', db: 'ghost-live&learn', col: 'subject_sz' };

    const col = await this.nestjsMdbLibService.getCol(data);
    await col.insertOne({ subject: '数据库概率', code: '02323' });

    const dd = { cliKey: 'hk', db: 'ghost-live&learn', col: 'subject_hk' };
    const colHk = await this.nestjsMdbLibService.getCol(dd);
    return Promise.resolve({ hk: await (await colHk.find()).toArray(), sz: await (await col.find()).toArray()});
  }

  async upload(data): Promise<Job> {
    const opt = {
      name: QUEUE_HANDLE_UPLOAD,
      data: {
        ...data,
        rondom: Math.random(),
      },
    };
    return this.add(opt);
  }
}
