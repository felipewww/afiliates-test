import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { TokenService } from './password-validator/token.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [
        TokenService
    ]
})
export class InfraModule {}
