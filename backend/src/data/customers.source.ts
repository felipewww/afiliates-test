import {BaseSource} from "@/data/base.source";

export interface CustomerModel {
    id: number,
    name: string
}

export class CustomersSource extends BaseSource {
    table = 'customers'
    
    async createByUsername(data: Array<string>) {
        
        const toInsert = data.map(name => {
            return { id: null, name, current_credits: 0 }
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
    
    async changeCurrentCredits(id: number, current_credits: number) {
        return this.db
            .update('customers')
            .set({current_credits})
            .where({id})
            .execute()
    }
}