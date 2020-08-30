import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Job, Queue } from 'bull';
import { QUEUE_NAME_UPLOAD } from './constants';
import { InjectQueue } from '@nestjs/bull';

@Controller()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  /**
   * @description 测试一个元素插入到队列
   * @param data
   */
  @Post('upload')
  upload(
    @Body() data: any,
  ): Promise<{job: Job, res: any}> {
    return this.uploadService.upload(data);
  }

  /**
   * @description 测试多个元素插入到队列
   * @param data
   */
  @Post('uploadMore')
  uploadMore(
    @Body() data: any[],
  ): Promise<Array<{job: Job, res: any}>> {
    return this.uploadService.uploadMore(data);
  }
}
