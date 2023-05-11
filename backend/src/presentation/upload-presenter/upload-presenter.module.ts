import {Module} from '@nestjs/common';
import {UploadController} from './upload/upload.controller';
import {UploadModule} from "@/domain/services/upload/upload.module";

@Module({
    controllers: [
        UploadController
    ],
    imports: [
        UploadModule
    ]
})
export class UploadPresenterModule {
}
