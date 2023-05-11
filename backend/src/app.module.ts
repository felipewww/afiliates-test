import {Module} from '@nestjs/common';
import {InfraModule} from "./infra/infra.module";
import {PresentationModule} from './presentation/presentation.module';

@Module({
    imports: [
        InfraModule,
        PresentationModule, // Controllers (api endpoint's are here)
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
