export interface ICustomer {
    id: number;
    name: string;
}
export declare enum ETransactionType {
    SALE_CREATOR = 1,
    SALE_AFFILIATE = 2,
    COMMISSION_PAID = 3,
    COMMISSION_RECEIVED = 4
}
export interface ITransaction {
    type: ETransactionType;
    course: {
        id: number;
        title: string;
    };
    price: number;
    date: Date;
}
export declare type TCustomerTransactionsCompounds = {
    Transactions: Array<ITransaction>;
    customer: ICustomer;
};
//# sourceMappingURL=CustomerTransactionsCompound.d.ts.map