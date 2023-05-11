import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { TokenProvider } from '@/infra/tokenProvider/token.provider';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [
        TokenProvider
    ]
})
export class InfraModule {}
