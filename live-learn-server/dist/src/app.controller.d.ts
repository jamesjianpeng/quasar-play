import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<string>;
    testMdb(): Promise<{
        hk: any[];
        sz: any[];
    }>;
    testLib(): Promise<string>;
}
