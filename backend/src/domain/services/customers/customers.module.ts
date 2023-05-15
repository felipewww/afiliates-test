import {Module} from '@nestjs/common';
import {CustomersService} from './customers.service';
import {CustomersSource} from "@/data/customers.source";

@Module({
    providers: [
        CustomersService,
        CustomersSource
    ],
    exports: [
        CustomersService
    ],
})
export class CustomersModule {
}
