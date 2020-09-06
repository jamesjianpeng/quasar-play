import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadProcessor } from './upload.processor';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME_UPLOAD } from './constants';
import settings from '../../../settings.json'
import { dbUrlToObject } from 'src/core/utils'
console.log(dbUrlToObject(settings.redis_sz_1))
@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME_UPLOAD, // 队列的名字
      redis: dbUrlToObject(settings.redis_sz_1),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, UploadProcessor],
})
export class UploadModule {}
