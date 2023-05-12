export interface ICustomer {
    id: number,
    name: string
}

export class CustomerEntity implements ICustomer {
    constructor(
        public id: number,
        public name: string
    ) {
    
    }
}