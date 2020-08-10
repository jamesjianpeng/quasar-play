import { DynamicModule } from '@nestjs/common';
import { IMdbOptions } from './interface';
export declare class MdbModule {
    static register(options: IMdbOptions): DynamicModule;
}
