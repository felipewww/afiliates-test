import {Inject} from "@nestjs/common";
import {DataSource, SelectQueryBuilder} from "typeorm";

export abstract class BaseSource {
    abstract table: string
    
    constructor(
        @Inject('CONNECTION') private connection: DataSource
    ) {
    }
    
    get db(){
        return this.connection.createQueryBuilder()
    }
    
    async get<T>(where?: { [key: string]: any }): Promise<Array<T>> {
        const query = this.db
            .select('*')
            .from(this.table, 'a')
        
        return this.exec(query)
        // if (where) {
        //     query.where(where)
        // }
        //
        // return query.execute();
    }
    
    async exec(query: SelectQueryBuilder<any>, where?: { [key: string]: any }) {
        if (where) {
            query.where(where)
        }
        
        return query.execute()
    }
}