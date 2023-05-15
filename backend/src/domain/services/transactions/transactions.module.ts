import {Module} from '@nestjs/common';
import {TransactionsService} from './transactions.service';
import {TransactionsRepo} from "@/domain/repositories/Transactions.repo";
import {TransactionsSource} from "@/data/transactions.source";

@Module({
    imports: [
    
    ],
    providers: [
        TransactionsService,
        TransactionsSource,
        TransactionsRepo
    ],
    exports: [
        TransactionsService
    ]
})
export class TransactionsModule {
}
