import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
// import { NestjsLoggerLibService } from '../../core/nestjs-logger-lib';
import { QUEUE_NAME_UPLOAD, QUEUE_HANDLE_UPLOAD } from './constants';

@Processor(QUEUE_NAME_UPLOAD)
export class UploadProcessor {
  @Process(QUEUE_HANDLE_UPLOAD)
  handleTranscode(job: Job) {
    console.log(JSON.stringify(job));
    return false;
  }
}
