import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthModule} from "@/domain/auth/auth.module";

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
