import { Module, DynamicModule } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { UploadModule } from './upload/upload.module';

const dynamicModule: any[] = [
  LoginModule,
  UploadModule,
]
@Module({
  imports: dynamicModule,
  exports: dynamicModule
})
export class FeatureModule {}
