import {Module} from '@nestjs/common';
import {UploadService} from './upload.service';
import {CustomersSource} from "@/data/customers.source";
import {CoursesSource} from "@/data/courses.source";

@Module({
    providers: [
        UploadService,
        CustomersSource,
        CoursesSource,
    ],
    exports: [
        UploadService
    ]
})
export class UploadModule {
}
