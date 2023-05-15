import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";
import {TransactionsRepo} from "@/domain/repositories/Transactions.repo";
import {TransactionEntity} from "@/domain/entities/Transaction.entity";
import {ITransaction} from "../../../../../common-types";

@Injectable()
export class TransactionsService extends BaseService<null, Array<ITransaction>> {
    
    constructor(
        private transactionsRepo: TransactionsRepo,
    ) {
        super();
    }
    
    async handle(so: any): Promise<Array<TransactionEntity>> {
        const transactions = await this.transactionsRepo.getAll();
        
        return Promise.resolve(transactions);
    }
}
