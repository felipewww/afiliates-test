import {ETransactionType} from "@/domain/services/upload/upload.service";
import {ICourseModel} from "@/data/courses.source";

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