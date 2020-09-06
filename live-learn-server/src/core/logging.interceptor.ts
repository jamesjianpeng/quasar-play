import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NestjsWinstonLoggingLibService } from './nestjs-winston-logging-lib';
import { NestjsLoggerLibService } from './nestjs-logger-lib'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
     private nestjsWinstonLoggingLibService: NestjsWinstonLoggingLibService,
     private nestjsLoggerLibService: NestjsLoggerLibService,
  ) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const args = context.getArgs()
    const [ req ] = args
    this.nestjsWinstonLoggingLibService.log({ level: 'info', text: 'Before...' });
    this.nestjsLoggerLibService.log(`request {${req.url}, ${req.method}} `, 'loggingIntercepter')

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          const diff = Date.now() - now
          this.nestjsLoggerLibService.log(`request {${req.url}, ${req.method}} spend time: ${diff}ms`, 'loggingIntercepter')
        }),
      );
  }
}
