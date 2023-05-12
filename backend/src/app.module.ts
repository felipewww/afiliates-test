import {Module} from '@nestjs/common';
import {InfraModule} from "./infra/infra.module";
import {PresentationModule} from './presentation/presentation.module';
import { UploadModule } from './domain/services/upload/upload.module';
import { TransactionsModule } from './domain/services/transactions/transactions.module';
import { CustomersModule } from './domain/services/customers/customers.module';
import { DomainModule } from './domain/domain.module';

@Module({
    imports: [
        InfraModule, //
        PresentationModule, // Controllers (api endpoint's are here)
        DomainModule, // business rules
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
