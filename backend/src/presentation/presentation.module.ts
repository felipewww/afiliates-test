import { Module } from '@nestjs/common';
import { AuthPresenterModule } from './auth/auth-presenter.module';

@Module({
  imports: [
      AuthPresenterModule
  ]
})
export class PresentationModule {}
