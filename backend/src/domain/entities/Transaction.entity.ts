import {ICourseModel} from "@/data/courses.source";
import {ETransactionType} from "@/data/transactions.source";

export class TransactionEntity {
    public currentCredits: number = 0
    
    constructor(
        public type: ETransactionType,
        public course: ICourseModel,
        public price: number,
        public date: Date,
    ) {
    
    }
}