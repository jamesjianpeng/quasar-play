import { Module, Global } from '@nestjs/common';
import settings from '../../settings.json';
import { NestjsMdbLibModule } from '@smartblog/nestjs-mdb-lib';

@Global()
@Module({
  imports: [
    NestjsMdbLibModule.register([
      { url: settings.mongo_sz, key: 'sz' },
      { url: settings.mongo_hk, key: 'hk' },
    ]),
  ],
  providers: [],
  exports: [ NestjsMdbLibModule ],
})
export class CommonModule {}
