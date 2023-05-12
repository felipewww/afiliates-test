import {Module} from '@nestjs/common';
import {UploadService} from './upload.service';
import {CustomersSource} from "@/data/customers.source";
import {CoursesSource} from "@/data/courses.source";
import {UploadsSource} from "@/data/uploads.source";
import {TransactionsSource} from "@/data/transactions.source";
import {TransactionsRepo} from "@/domain/repositories/Transactions.repo";

@Module({
    imports: [
        TransactionsSource,
    ],
    providers: [
        UploadService,
        CustomersSource,
        CoursesSource,
        UploadsSource,
        TransactionsRepo,
        TransactionsSource,
    ],
    exports: [
        UploadService
    ]
})
export class UploadModule {
}
