import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";

@Injectable()
export class CustomersService extends BaseService<any, any>{
    async handle(so: any): Promise<any> {
        return Promise.resolve('CustomersService response');
    }
    
}
