import winston from 'winston';

export interface ILoggingOptions {
  [key: string]: any;
  service: string;
  fileLocation?: string;
}

export interface  ILoggingCreateOption {
  level: string;
  // options?: winston.LoggerOptions;
}

export type ILoggingCreateOptions = ILoggingCreateOption[];

export interface ILog {
  level: string;
  text: string;
}
