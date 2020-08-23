import { Injectable, Inject } from '@nestjs/common';
import { ILOGGLING_OPTION, commonConfig } from './constans';
import { ILoggingOptions, ILoggingCreateOptions, ILoggingCreateOption, ILog } from './interface';
import winston from 'winston';

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

  addLog(opt: ILoggingCreateOption): winston.Logger {
    this.loggerOptions.push(opt);
    this.loggingMap[opt.level] = this.createLogger(opt);
    return this.loggingMap[opt.level];
  }

  async test() {
    return 'nestjs loggint lib';
  }
}
