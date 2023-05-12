import {BaseSource} from "@/data/base.source";

export interface CustomerModel {
    id: number,
    name: string
}

export class CustomersSource extends BaseSource {
    table = 'customers'
    
    async createByUsername(data: Array<string>) {
        
        const toInsert = data.map(name => {
            return { id: null, name }
        })
        
        const query = this.db
            .insert()
            .into(this.table)
            .values(toInsert)
            .orIgnore()
        
        return query.execute();
    }
    
    async getByUsername(usernames: Array<string>) {
        const query = this.db
            .select('*')
            .from(this.table, 'a')
            .andWhere('a.name IN (:...usernames)')
            .setParameter('usernames', usernames)
        
        return query.execute()
    }
}