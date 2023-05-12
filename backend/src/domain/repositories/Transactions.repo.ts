import {CustomerTransactionsManager} from "@/domain/entities/CustomerTransactionsManager";
import {ETransactionType, TransactionsModel, TransactionsSource} from "@/data/transactions.source";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TransactionsRepo {
    constructor(
        private transactionsSource: TransactionsSource
    ) {
    
    }
    
    async save(
        customerTransactionsIndexed: { [key: string]: CustomerTransactionsManager },
        uploadId: number
    ) {
        const dataModel: Array<TransactionsModel> = []
        
        for (let pos of Object.keys(customerTransactionsIndexed)) {
            const manager = customerTransactionsIndexed[pos]
            let transactions = manager.transactions
            
            for (let t of transactions) {
                dataModel.push({
                    id: null,
                    price: t.price,
                    transaction_type_id: t.type,
                    course_id: t.course.id,
                    customer_id: manager.customer.id,
                    upload_id: uploadId,
                    credit_sale_creator: (ETransactionType.SALE_CREATOR) ? t.price : null,
                    credit_commission_received: (ETransactionType.COMMISSION_RECEIVED) ? t.price : null,
                    credit_sale_affiliate: (ETransactionType.SALE_AFFILIATE) ? t.price : null,
                    debit_commission_paid: (ETransactionType.COMMISSION_PAID) ? t.price : null,
                    current_credits: t.currentCredits,
                    created_at: t.date.toISOString(),
                })
            }
        }
        
        return this.transactionsSource.save(dataModel)
    }
}