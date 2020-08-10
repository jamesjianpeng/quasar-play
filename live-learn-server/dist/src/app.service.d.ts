import { OnModuleInit } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
export declare class AppService implements OnModuleInit {
    private nestjsMdbLibService;
    constructor(nestjsMdbLibService: NestjsMdbLibService);
    onModuleInit(): void;
    getHello(): Promise<string>;
}
