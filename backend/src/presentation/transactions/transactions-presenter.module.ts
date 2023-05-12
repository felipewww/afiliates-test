import {Module} from '@nestjs/common';
import {TransactionsController} from './transactions.controller';
import {TransactionsModule} from "@/domain/services/transactions/transactions.module";

@Module({
    controllers: [TransactionsController],
    imports: [
        TransactionsModule
    ]
})
export class TransactionsPresenterModule {
}
