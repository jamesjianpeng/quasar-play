import { Injectable, Inject } from '@nestjs/common';
import { ILOGGLING_OPTION } from './constans';
import { ILoggingOptions, ILoggingCreateOptions, ILoggingCreateOption, ILog } from './interface';
import winston, { format } from 'winston';

const serviceName = 'service';

const commonConfig = {
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.simple(),
  ),
  defaultMeta: { service: serviceName },
  transports: [
    new winston.transports.File({ filename: 'info.log' }),
  ],
};

@Injectable()
export class NestjsLoggingLibService {
  private loggerOptions: ILoggingCreateOptions = [
    {
      level: 'info',
      options: this.createLoggerOptions({
        transports: [
          new winston.transports.File({ filename: 'info.log', level: 'info' }),
        ],
      }),
    },
    {
      level: 'warn',
      options: this.createLoggerOptions({
        transports: [
          new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
        ],
      }),
    },
    {
      level: 'error',
      options: this.createLoggerOptions({
        transports: [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
        ],
      }),
    },
  ];

  private loggingMap: winston.Logger[] = [];

  constructor(
    @Inject(ILOGGLING_OPTION) private options: ILoggingOptions,
  ) {
    this.createLoggers();
  }

  createLogger(options: winston.LoggerOptions) {
    return winston.createLogger(options);
  }

  createLoggerOptions(options: winston.LoggerOptions): winston.LoggerOptions {
    return {
      ...commonConfig,
      defaultMeta: { service: this.options.service },
    };
  }

  createLoggers() {
    this.loggerOptions.map(({ level, options }: ILoggingCreateOption) => {
      this.loggingMap[level] = this.createLogger(options);
    });
    return this.loggingMap;
  }

  log({ level, text }: ILog) {
    const logger: winston.Logger = this.loggingMap[level];
    if (!logger) {
      console.error(`${level} logger is invalid，${text} don't output`);
      return;
    }
    return logger[level](text);
  }

  async test() {
    return 'nestjs loggint lib';
  }
}
