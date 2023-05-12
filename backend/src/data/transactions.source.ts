import {BaseSource} from "@/data/base.source";

export enum ETransactionType {
    SALE_CREATOR = 1,
    SALE_AFFILIATE,//should not register credits change, just save this register in database
    COMMISSION_PAID,
    COMMISSION_RECEIVED
}

export interface TransactionsModel {
    id: number,
    price: number,
    transaction_type_id: ETransactionType,
    course_id: number,
    customer_id: number,
    upload_id: number,
    // credit_sale_creator: number
    // credit_commission_received: number
    // credit_sale_affiliate: number
    // debit_commission_paid: number
    current_credits: number
    created_at: string
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
}