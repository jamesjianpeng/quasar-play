import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadProcessor } from './upload.processor';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME_UPLOAD } from './constants';
@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME_UPLOAD, // 队列的名字
      redis: { // redis 这个配置不传，则默认是 localhost:6379/0
        host: 'localhost',
        port: 6379,
        db: 2, // db 默认是 0
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, UploadProcessor],
})
export class UploadModule {}
