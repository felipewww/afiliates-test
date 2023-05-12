import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { TokenProvider } from '@/infra/TokenProvider/Token.provider';
import {MySQLModule} from "@/infra/Db/MySQL.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MySQLModule
    ],
    providers: [
        TokenProvider
    ]
})
export class InfraModule {}
