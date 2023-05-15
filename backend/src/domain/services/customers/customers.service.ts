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
    
    async handle(so: { id: number }): Promise<any> {
        const res = await this.customersSource.get<ICustomer>(
            {id: so.id},
            'id, name, current_credits as currentCredits'
        )
        
        return Promise.resolve(res);
    }
    
}
