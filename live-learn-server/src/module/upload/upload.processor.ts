import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { NestjsLoggerLibService } from '../../core/nestjs-logger-lib';
import { UPLOAD_FILE_QUEUE } from './constants';

@Processor(UPLOAD_FILE_QUEUE)
export class UploadProcessor {
  constructor(
    private readonly nestjsLoggerLibService: NestjsLoggerLibService,
  ) {}
  @Process('transcode')
  handleTranscode(job: Job) {
    this.nestjsLoggerLibService.log(job.data, '11');
  }
}
