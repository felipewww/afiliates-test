import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersSource} from "@/data/users.source";
import {UsersRepo} from "@/domain/repositories/Users.repo";
import {TokenService} from "@/infra/password-validator/token.service";

@Module({
    imports: [
        UsersSource,
    ],
    providers: [
        AuthService,
        UsersSource,
        UsersRepo,
        TokenService
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
