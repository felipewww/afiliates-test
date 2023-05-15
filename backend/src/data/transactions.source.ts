import {BaseSource} from "@/data/base.source";
import {ETransactionType} from 'common-types'

export interface TransactionsModel {
    id: number,
    price: number,
    transaction_type_id: ETransactionType,
    course_id: number,
    customer_id: number,
    upload_id: number,
    current_credits: number
    created_at: string
}

export interface TransactionFullModel extends TransactionsModel{
    customer_name: string
    course_title: string
}

export class TransactionsSource extends BaseSource {
    table = 'transactions'
    
    save(data: Array<TransactionsModel>) {
        const query = this.db
            .insert()
            .into(this.table)
            .values(data)
        
        return query.execute();
    }
    
    async getAll(): Promise<Array<TransactionFullModel>> {
        const query = this.db
            .select(['T.*', 'C.name as customer_name', 'CO.title as course_title'])
            .from(this.table, 'T')
            .innerJoin('customers', 'C', 'C.id = T.customer_id')
            .innerJoin('courses', 'CO', 'CO.id = T.course_id')
            .orderBy('T.created_at', 'DESC')
        
        return super.exec(query)
    }
}