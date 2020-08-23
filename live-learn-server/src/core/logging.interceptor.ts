import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import winston, { format } from 'winston';
import { NestjsLoggingLibService } from './nestjs-logging-lib';

const serviceName = 'service';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: '[my-label]' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.simple(),
  ),
  defaultMeta: { service: serviceName },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'info.log' }),
  ],
});

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
     private nestjsLoggingLibService: NestjsLoggingLibService,
  ) {

  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    this.nestjsLoggingLibService.log({ level: 'info', text: 'Before...' });

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
