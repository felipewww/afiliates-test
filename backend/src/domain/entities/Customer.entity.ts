export interface ICustomer {
    id: number,
    name: string
}

export class CustomerEntity {
    constructor(
        public id: number,
        public name: string
    ) {
    
    }
}