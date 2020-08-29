import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadProcessor } from './upload.processor';
import { BullModule } from '@nestjs/bull';
import { UPLOAD_FILE_QUEUE } from './constants';
@Module({
  imports: [
    BullModule.registerQueue({
      name: UPLOAD_FILE_QUEUE,
      redis: {
        host: 'localhost',
        port: 6379,
        db: 2,
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, UploadProcessor],
})
export class UploadModule {}
