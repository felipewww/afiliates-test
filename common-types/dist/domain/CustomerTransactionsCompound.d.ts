export interface ICustomer {
    id: number;
    name: string;
    currentCredits: number;
}
export declare enum ETransactionType {
    SALE_CREATOR = 1,
    SALE_AFFILIATE = 2,
    COMMISSION_PAID = 3,
    COMMISSION_RECEIVED = 4
}
export interface ITransaction {
    id: number;
    type: ETransactionType;
    course: {
        id: number;
        title: string;
    };
    price: number;
    date: string;
    customer: ICustomer;
}
export declare type TCustomerTransactionsCompounds = {
    Transactions: Array<ITransaction>;
    customer: ICustomer;
};
//# sourceMappingURL=CustomerTransactionsCompound.d.ts.map