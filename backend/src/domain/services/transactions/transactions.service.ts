import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";

@Injectable()
export class TransactionsService extends BaseService<any, any> {
    async handle(so: any): Promise<any> {
        return Promise.resolve('TransactionsService');
    }
}
