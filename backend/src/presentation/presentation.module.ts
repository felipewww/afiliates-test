import { Module } from '@nestjs/common';
import { AuthPresenterModule } from './auth/auth-presenter.module';
import { UploadPresenterModule } from './upload-presenter/upload-presenter.module';

@Module({
  imports: [
      AuthPresenterModule,
      UploadPresenterModule
  ]
})
export class PresentationModule {}
