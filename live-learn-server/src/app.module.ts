import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './module/login/login.module';
import { CommonModule } from './core/common.module';
import { UploadModule } from './module/upload/upload.module';
@Module({
  imports: [
    CommonModule,
    LoginModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
