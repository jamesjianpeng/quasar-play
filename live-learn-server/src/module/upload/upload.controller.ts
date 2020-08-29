import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Job, Queue } from 'bull';
import { UPLOAD_FILE_QUEUE } from 'src/module/upload/constants';
import { InjectQueue } from '@nestjs/bull';

@Controller()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @InjectQueue(UPLOAD_FILE_QUEUE) private uploadFileQueue: Queue,
  ) {}

  @Post('upload')
  getHello(
    @Body() data: any,
  ): Promise<Job> {
    // return this.uploadService.upload(data);
    const options = { attempts: 2 };
    return this.uploadFileQueue.add('testname', data, options);
  }
}
