import {BaseSource} from "@/data/base.source";
import {ETransactionType} from 'common-types'

// export enum ETransactionType {
//     SALE_CREATOR = 1,
//     SALE_AFFILIATE,//should not register credits change, just save this register in database
//     COMMISSION_PAID,
//     COMMISSION_RECEIVED
// }

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
    
    async getAll(uploadId: number): Promise<Array<TransactionFullModel>> {
        const query = this.db
            .select(['T.*', 'C.name as customer_name', 'CO.title as course_title'])
            .from(this.table, 'T')
            .innerJoin('customers', 'C', 'C.id = T.customer_id')
            .innerJoin('courses', 'CO', 'CO.id = T.course_id')
        
        return super.exec(query, { upload_id: uploadId})
    }
}