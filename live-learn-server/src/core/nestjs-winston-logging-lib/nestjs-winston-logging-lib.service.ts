import { Injectable, Inject } from '@nestjs/common';
import { ILOGGLING_OPTION, commonConfig } from './constans';
import { ILoggingOptions, ILoggingCreateOptions, ILoggingCreateOption, ILog } from './interface';
import winston from 'winston';

@Injectable()
export class NestjsWinstonLoggingLibService {
  private loggerOptions: ILoggingCreateOptions = [
    {
      level: 'info'
    },
    {
      level: 'warn'
    },
    {
      level: 'error'
    }
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

  createLoggerOptions({ level }: ILoggingCreateOption): winston.LoggerOptions {
    let filename = `${level}.log`
    filename = this.options.fileLocation ? `${this.options.fileLocation}/${filename}` : filename
    const options = {
      level,
      defaultMeta: {
        service: this.options.service
      },
      transports: [
        new winston.transports.File({ filename, level })
      ]
    }
    return {
      ...commonConfig,
      ...options
    };
  }

  createLoggers() {
    this.loggerOptions.map((opt: ILoggingCreateOption) => {
      const option = this.createLoggerOptions(opt)
      this.loggingMap[opt.level] = this.createLogger(option)
    });
    return this.loggingMap;
  }

  log({ level, text }: ILog) {
    console.log(this.loggingMap)
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
