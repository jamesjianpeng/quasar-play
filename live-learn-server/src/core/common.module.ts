import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import settings from '../../settings.json';
import { NestjsMdbLibModule } from '@smartblog/nestjs-mdb-lib';
import { NestjsLoggintLibModule } from './nestjs-winston-logging-lib';
import { LoggingInterceptor } from './logging.interceptor';
import { NestjsLoggerLibService } from './nestjs-logger-lib';
@Global()
@Module({
  imports: [
    NestjsMdbLibModule.register([
      { url: settings.mongo_sz, key: 'sz' },
      { url: settings.mongo_hk, key: 'hk' },
    ]),
    NestjsLoggintLibModule.register({ service: 'live-learn-service' }),
  ],
  providers: [
    // 为了在 interceptor 中使用依赖注入的方式使用其他的 sercice 需要写成 prociders
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    NestjsLoggerLibService,
  ],
  exports: [
    NestjsMdbLibModule,
    NestjsLoggintLibModule,
    NestjsLoggerLibService,
  ],
})
export class CommonModule {}
