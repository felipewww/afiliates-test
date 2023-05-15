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
                    created_at: t.date.toISOString(),
                })
            }
        }
        
        return this.transactionsSource.save(dataModel)
    }
    
    async getByUploadId(uploadId: number) {
        const transactions = await this.transactionsSource.getAll(
            uploadId
        )
        
        const compounds: { [key: number]: CustomerTransactionsComposite } = {}
        
        for (let row of transactions) {
            let customerEntity;
            
            let composite = compounds[row.customer_id];
            
            if (!composite) {
                customerEntity = new CustomerEntity(row.customer_id, row.customer_name);
                composite = new CustomerTransactionsComposite(customerEntity)
                compounds[row.customer_id] = composite
            }
            
            composite.addTransaction(
                new TransactionEntity(
                    row.transaction_type_id,
                    {
                        id: row.course_id,
                        title: row.customer_name
                    },
                    row.price,
                    new Date(row.created_at)
                )
            )
        }
        
        return compounds;
    }
}