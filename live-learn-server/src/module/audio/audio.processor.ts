import { Process, Processor, OnQueueActive } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import {QUEUE_NAME} from './audio.constants';
@Processor(QUEUE_NAME)
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcodeT')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job [${job.id}] of type <${job.name}> with data ${JSON.stringify(job.data)}...`,
    );
  }
}
