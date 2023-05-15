import {ICustomer} from 'common-types'

export class CustomerEntity implements ICustomer {
    public currentCredits: number
    
    constructor(
        public id: number,
        public name: string,
    ) {
    
    }
}