import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";
import {TransactionsRepo} from "@/domain/repositories/Transactions.repo";
import {CustomerTransactionsComposite} from "@/domain/entities/CustomerTransactionsComposite";

@Injectable()
export class TransactionsService extends BaseService<any, any> {
    
    constructor(
        private transactionsRepo: TransactionsRepo,
    ) {
        super();
    }
    
    async handle(so: any): Promise<{ [key: number]: CustomerTransactionsComposite }> {
        const compounds = await this.transactionsRepo.getByUploadId(34);
        // Utils.log(compounds)
        
        return Promise.resolve(compounds);
    }
}
