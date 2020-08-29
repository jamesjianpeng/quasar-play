import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Job } from 'bull';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  getHello(
    @Body() data: any,
  ): Promise<Job> {
    return this.uploadService.upload(data);
  }
}
