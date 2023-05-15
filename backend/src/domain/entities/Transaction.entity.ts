import {ICourseModel} from "@/data/courses.source";
import {ETransactionType} from "../../../../common-types/src/domain/CustomerTransactionsCompound";
import {ITransaction} from 'common-types'
import {ICustomer} from "../../../../common-types";

export class TransactionEntity implements ITransaction {
    public id: number
    public currentCredits: number = 0
    public customer: ICustomer;
    public dateTime: Date
    
    constructor(
        public type: ETransactionType,
        public course: ICourseModel,
        public price: number,
        public date: string,
    ) {
        this.dateTime = new Date(date)
    }
}