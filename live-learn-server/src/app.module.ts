import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './module/login/login.module';
import { CommonModule } from './core/common.module';
import { UploadModule } from './module/upload/upload.module';
import { AudioModule } from './module/audio/audio.module';
@Module({
  imports: [
    CommonModule,
    LoginModule,
    UploadModule,
    AudioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
