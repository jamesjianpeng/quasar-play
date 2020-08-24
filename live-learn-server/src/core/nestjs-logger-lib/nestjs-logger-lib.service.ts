import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class NestjsLoggerLibService extends Logger {
  log(message: string, trace: string) {
    // add your tailored logic here
    super.log(message, trace);
  }
  error(message: string, trace: string) {
    // add your tailored logic here
    super.error(message, trace);
  }
  warn(message: string) {
    // add your tailored logic here
    super.warn(message);
  }
  debug(message: string) {
    // add your tailored logic here
    super.debug(message);
  }
}
