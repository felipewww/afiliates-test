import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersSource} from "@/data/users.source";
import {UsersRepo} from "@/domain/repositories/Users.repo";
import {TokenProvider} from "@/infra/tokenProvider/token.provider";

@Module({
    imports: [
        UsersSource,
    ],
    providers: [
        AuthService,
        UsersSource,
        UsersRepo,
        TokenProvider
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
