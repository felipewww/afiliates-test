export interface ICustomer {
    id: number,
    name: string
    currentCredits: number
}

export enum ETransactionType {
    SALE_CREATOR = 1,
    SALE_AFFILIATE,//should not register credits change, just save this register in database
    COMMISSION_PAID,
    COMMISSION_RECEIVED
}

export interface ITransaction {
    id: number,
    type: ETransactionType
    course: {
        id: number,
        title: string
    }
    price: number,
    date: string
    customer: ICustomer
}

export type TCustomerTransactionsCompounds = {
    Transactions: Array<ITransaction>
    customer: ICustomer
}