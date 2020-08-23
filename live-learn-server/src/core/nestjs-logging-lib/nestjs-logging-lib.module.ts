import { Module, DynamicModule } from '@nestjs/common';
import { ILOGGLING_OPTION } from './constans';
import { ILoggingOptions } from './interface';
import { NestjsLoggingLibService } from './nestjs-logging-lib.service';

@Module({
  providers: [NestjsLoggingLibService],
  exports: [NestjsLoggingLibService],
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
        NestjsLoggingLibService,
      ],
      exports: [NestjsLoggingLibService],
    };
  }
}
