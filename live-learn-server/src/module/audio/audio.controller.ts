import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUE_NAME } from './audio.constants';

@Controller('audio')
export class AudioController {
  constructor(@InjectQueue(QUEUE_NAME) private readonly audioQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add('transcodeT', {
      key: Math.random(),
    });
  }
}
