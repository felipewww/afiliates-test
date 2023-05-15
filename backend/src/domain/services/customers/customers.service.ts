import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";
import {CustomersSource} from "@/data/customers.source";
import {ICustomer} from "../../../../../common-types";

@Injectable()
export class CustomersService extends BaseService<any, any>{
    constructor(
        private customersSource: CustomersSource,
    ) {
        super();
    }
    
    async handle(so: any): Promise<any> {
        const res = await this.customersSource.get<ICustomer>()
        return Promise.resolve(res);
    }
    
}
