import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioProcessor } from './audio.processor';
import { QUEUE_NAME } from './audio.constants';
@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME,
      redis: {
        host: 'localhost',
        port: 6379,
        db: 2,
      },
    }),
  ],
  controllers: [AudioController],
  providers: [AudioProcessor],
})
export class AudioModule {}
