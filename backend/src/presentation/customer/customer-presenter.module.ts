import {Module} from '@nestjs/common';
import {CustomerController} from './customer.controller';
import {CustomersModule} from "@/domain/services/customers/customers.module";

@Module({
    controllers: [CustomerController],
    imports: [
        CustomersModule
    ]
})
export class CustomerPresenterModule {
}
