import {CustomerTransactionsComposite} from "@/domain/entities/CustomerTransactionsComposite";
import {TransactionsModel, TransactionsSource} from "@/data/transactions.source";
import {Injectable} from "@nestjs/common";
import {CustomerEntity} from "@/domain/entities/Customer.entity";
import {TransactionEntity} from "@/domain/entities/Transaction.entity";

@Injectable()
export class TransactionsRepo {
    constructor(
        private transactionsSource: TransactionsSource
    ) {
    
    }
    
    async save(
        compoundsIndexed: { [key: string]: CustomerTransactionsComposite },
        uploadId: number
    ) {
        const dataModel: Array<TransactionsModel> = []
        
        let x = ''
        
        for (let pos of Object.keys(compoundsIndexed)) {
            const composite = compoundsIndexed[pos]
            let transactions = composite.transactions
            
            for (let t of transactions) {
                dataModel.push({
                    id: null,
                    price: t.price,
                    transaction_type_id: t.type,
                    course_id: t.course.id,
                    customer_id: composite.customer.id,
                    upload_id: uploadId,
                    current_credits: t.currentCredits,
                    created_at: t.dateTime.toISOString()
                })
            }
        }
        
        return this.transactionsSource.save(dataModel)
    }
    
    async getAll() {
        const rows = await this.transactionsSource.getAll()
        
        const transactions: Array<TransactionEntity> = []
        
        for (let row of rows) {
            let transaction = new TransactionEntity(
                row.transaction_type_id,
                {
                    id: row.course_id,
                    title: row.course_title
                },
                row.price,
                row.created_at
            )
            
            transaction.id = row.id
            
            transaction.customer = new CustomerEntity(row.customer_id, row.customer_name);
            
            transactions.push(transaction)
        }
        
        return transactions;
    }
}