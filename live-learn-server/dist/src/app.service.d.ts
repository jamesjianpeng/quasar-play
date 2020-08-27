import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
import { NestjsLoggerLibService } from './core/nestjs-logger-lib';
export declare class AppService {
    private nestjsMdbLibService;
    private nestjsLoggerLibService;
    constructor(nestjsMdbLibService: NestjsMdbLibService, nestjsLoggerLibService: NestjsLoggerLibService);
    test(): Promise<{
        hk: any[];
        sz: any[];
    }>;
    getHello(): Promise<string>;
    testLib(): Promise<string>;
    testMdb(): Promise<{
        hk: any[];
        sz: any[];
    }>;
}
