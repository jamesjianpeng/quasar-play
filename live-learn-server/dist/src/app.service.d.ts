import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
export declare class AppService {
    private nestjsMdbLibService;
    constructor(nestjsMdbLibService: NestjsMdbLibService);
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
