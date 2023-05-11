import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";

@Injectable()
export class UploadService extends BaseService<string, any>{
    async handle(so?: string): Promise<any> {
        
        console.log('file text in usecase!')
        console.log(so)
        
        return Promise.resolve(undefined);
    }
}
