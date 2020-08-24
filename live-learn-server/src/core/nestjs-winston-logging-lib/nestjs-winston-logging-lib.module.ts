import { Module, DynamicModule } from '@nestjs/common';
import { ILOGGLING_OPTION } from './constans';
import { ILoggingOptions } from './interface';
import { NestjsWinstonLoggingLibService } from './nestjs-winston-logging-lib.service';

@Module({
  providers: [NestjsWinstonLoggingLibService],
  exports: [NestjsWinstonLoggingLibService],
})
export class NestjsLoggintLibModule {
  static register(options: ILoggingOptions): DynamicModule {
    return {
      module: NestjsLoggintLibModule,
      providers: [
        {
          provide: ILOGGLING_OPTION,
          useValue: options,
        },
        NestjsWinstonLoggingLibService,
      ],
      exports: [NestjsWinstonLoggingLibService],
    };
  }
}
