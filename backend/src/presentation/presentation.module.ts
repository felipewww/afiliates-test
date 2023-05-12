import {Module} from '@nestjs/common';
import {AuthPresenterModule} from './auth/auth-presenter.module';
import {UploadPresenterModule} from './upload-presenter/upload-presenter.module';
import {CustomerPresenterModule} from './customer/customer-presenter.module';
import {TransactionsPresenterModule} from './transactions/transactions-presenter.module';

@Module({
    imports: [
        AuthPresenterModule,
        UploadPresenterModule,
        CustomerPresenterModule,
        TransactionsPresenterModule,
    ],
})
export class PresentationModule {
}
