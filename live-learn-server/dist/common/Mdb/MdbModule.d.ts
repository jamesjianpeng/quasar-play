import { DynamicModule } from '@nestjs/common';
import { MdbOptions } from './interface';
export declare class MdbModule {
    static register(options: MdbOptions): DynamicModule;
}
