import { Process, Processor, OnQueueStalled, OnQueueProgress, OnQueueWaiting, OnQueueActive, OnQueueCompleted, OnQueueFailed, OnQueueError } from '@nestjs/bull';
import { Job } from 'bull';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
// import { NestjsLoggerLibService } from '../../core/nestjs-logger-lib';
import { QUEUE_NAME_UPLOAD, QUEUE_HANDLE_UPLOAD } from './constants';
import { ObjectID, ObjectId } from 'bson';

/**
 * @class QUEUE_NAME_UPLOAD 消费 class
 * @function queueHandleUpload QUEUE_HANDLE_UPLOAD 者的处理函数
 */
@Processor(QUEUE_NAME_UPLOAD)
export class UploadProcessor {
  constructor(
    private nestjsMdbLibService: NestjsMdbLibService,
  ) {}

  /**
   * @description QUEUE_NAME_UPLOAD 变量队列的消费者 class 中其中某一个消费者：QUEUE_HANDLE_UPLOAD
   * @param {Job} job
   */
  @Process(QUEUE_HANDLE_UPLOAD)
  async queueHandleUpload(job: Job) {
    const data = { cliKey: 'sz', db: 'queueUpload', col: 'subject' };
    console.log(JSON.stringify(job));
    const col = await this.nestjsMdbLibService.getCol(data);
    const jobData = job.data;
    const res = await col.findOne({ _id: new ObjectID(jobData._id) });
    const count = 1;
    const resp = await this.upload(res, count);
    console.log('finish');
    console.log('change Before', JSON.stringify(resp));
    const respData = await col.updateOne({ _id: new ObjectId(jobData._id) }, { ['$set']: { state: 2 } });
    console.log('changeAfter', JSON.stringify(respData), '\n');
    return resp;
  }

  /**
   * @description 任务进度
   * @param job
   */
  @OnQueueProgress()
  onQueueProgress(job: Job, progress: number) {
    console.log('onQueueProgress');
    console.log(JSON.stringify(job));
    console.log((progress));
    console.log('onQueueProgress--- \n');
  }
  /**
   * @description 滞留的任务
   * @param job
   */
  @OnQueueStalled()
  onQueueStalled(job: Job) {
    console.log('onQueueStalled');
    console.log(JSON.stringify(job));
    console.log('onQueueStalled--- \n');
  }

  /**
   * @description 等待的任务
   * @param job
   */
  @OnQueueWaiting()
  onQueueWaiting(job: Job) {
    console.log('onQueueWaiting');
    console.log(JSON.stringify(job));
    console.log('onQueueWaiting--- \n');
  }

  /**
   * @description 正在进行的任务
   * @param job
   */
  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log('onQueueActive');
    console.log(JSON.stringify(job));
    console.log('onQueueActive--- \n');
  }
  /**
   * @description 正在进行的任务
   * @param job
   */
  @OnQueueCompleted()
  onQueueCompleted(job: Job) {
    console.log('onQueueCompleted');
    console.log(JSON.stringify(job));
    console.log('onQueueCompleted--- \n');
  }

  /**
   * @description 失败的任务
   * @param job
   */
  @OnQueueFailed()
  onQueueFailed(job: Job, error: Error) {
    console.log('onQueueFailed');
    console.log(JSON.stringify(job));
    console.log(JSON.stringify(error));
    console.log('onQueueFailed--- \n');
  }

  /**
   * @description 失败的任务
   * @param job
   */
  @OnQueueError()
  onQueueError(error: Error) {
    console.log('onQueueError');
    console.log(error);
    console.log('onQueueError--- \n');
  }

  upload(data: any, count: number = 1, finishCount?: number): Promise<any> {
    console.log(JSON.stringify(data), count, '\n');
    finishCount = finishCount || 10;
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        if (count > finishCount) {
          resolve(data);
        } else {
          resolve(await this.upload(data, count + 1));
        }
      }, 1000);
    });
  }
}
