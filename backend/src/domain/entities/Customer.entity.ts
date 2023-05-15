import {ICustomer} from 'common-types'

export class CustomerEntity implements ICustomer {
    constructor(
        public id: number,
        public name: string
    ) {
    
    }
}