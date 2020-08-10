import { OnModuleInit } from '@nestjs/common';
import { MdbService } from './common/Mdb/MdbService';
export declare class AppService implements OnModuleInit {
    private MdbService;
    constructor(MdbService: MdbService);
    onModuleInit(): void;
    getHello(): string;
}
