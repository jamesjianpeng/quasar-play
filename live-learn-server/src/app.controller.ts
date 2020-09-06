import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/testMdb')
  testMdb() {
    return this.appService.testMdb();
  }

  @Get('/testLib')
  testLib() {
    return this.appService.testLib();
  }

  @Get('/test')
  test() {
    return this.appService.test();
  }
}
