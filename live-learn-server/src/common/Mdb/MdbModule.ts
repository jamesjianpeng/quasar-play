import { DynamicModule, Module, Global } from '@nestjs/common';
import { IMdbOptions } from './interface'
import { MDB_OPTIONS } from './constants'
import { MdbService } from './MdbService'

@Global()
@Module({})
export class MdbModule {
  static register(options: IMdbOptions): DynamicModule {
    return {
      module: MdbModule,
      providers: [
        {
          provide: MDB_OPTIONS,
          useValue: options,
        },
        MdbService
      ],
      exports: [MdbService],
    };
  }
}
