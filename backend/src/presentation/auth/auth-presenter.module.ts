import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthModule} from "@/domain/services/auth/auth.module";

@Module({
    controllers: [
        AuthController
    ],
    imports: [
        AuthModule,
    ],
})
export class AuthPresenterModule {
}
