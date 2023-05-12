import { Module } from '@nestjs/common';
import {TransactionsModule} from "@/domain/services/transactions/transactions.module";
import {CustomersModule} from "@/domain/services/customers/customers.module";

@Module({
    imports: [
        TransactionsModule,
        CustomersModule
    ],
    exports: [
        TransactionsModule,
        CustomersModule
    ]
})
export class DomainModule {}
