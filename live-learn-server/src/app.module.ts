import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MdbModule } from './common/Mdb/MdbModule'
import settings from '../settings.json'
import { NestjsMdbLibModule } from '@smartblog/nestjs-mdb-lib/dist'

@Module({
  imports: [
    MdbModule.register([
      { url: settings.mongo_sz, key: 'sz' },
      { url: settings.mongo_hk, key: 'hk' }
    ]),
    // MdbModule.register({ url: 'mongodb://root:Pj-mongo-199511@47.75.157.180:27017' })
    NestjsMdbLibModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
