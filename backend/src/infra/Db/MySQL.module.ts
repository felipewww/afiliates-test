import {Global, Module, Scope} from '@nestjs/common';
import {REQUEST} from "@nestjs/core";
import {DataSource} from "typeorm";
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as process from "process";

const connectionFactory = {
    provide: 'CONNECTION',
    scope: Scope.REQUEST,
    useFactory: (req) => {
        const connectionSettings: MysqlConnectionOptions = {
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
            }
        
        return new DataSource(connectionSettings).initialize()
    },
    inject: [REQUEST],
};

@Global()
@Module({
    providers: [connectionFactory],
    exports: ['CONNECTION'],
})
export class MySQLModule {}
