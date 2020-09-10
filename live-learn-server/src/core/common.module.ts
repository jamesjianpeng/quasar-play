import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import settings from '../../settings.json';
import { NestjsMdbLibModule } from '@smartblog/nestjs-mdb-lib';
import { NestjsRdbLibModule } from '@smartblog/nestjs-rdb-lib';
import { NestjsWinstonLoggintLibModule } from './nestjs-winston-logging-lib';
import { LoggingInterceptor } from './logging.interceptor';
import { NestjsLoggerLibService } from './nestjs-logger-lib';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './nestjs-websocket-lib/event.module';
import { createLogFileLocation } from './utils'
import { MapperService } from './mapper.service'

@Global()
@Module({
  imports: [
    NestjsMdbLibModule.register([
      { url: settings.mongo_sz, key: 'sz' },
      { url: settings.mongo_hk, key: 'hk' },
    ]),
    NestjsRdbLibModule.register([
      { url: settings.redis_sz_1, key: 'sz_1' },
      { url: settings.redis_sz_2, key: 'sz_2' }
    ]),
    ScheduleModule.forRoot(),
    NestjsWinstonLoggintLibModule.register({
      service: 'live-learn-service',
      fileLocation: createLogFileLocation(settings.serverLogFileLocation)
    }),
    EventsModule,
  ],
  providers: [
    // 为了在 interceptor 中使用依赖注入的方式使用其他的 sercice 需要写成 prociders
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    NestjsLoggerLibService,
    MapperService
  ],
  exports: [
    NestjsMdbLibModule,
    NestjsRdbLibModule,
    NestjsWinstonLoggintLibModule,
    EventsModule,
    NestjsLoggerLibService,
    MapperService
  ],
})
export class CommonModule {}
