import {Controller, Get, Res} from '@nestjs/common';
import {TransactionsService} from "@/domain/services/transactions/transactions.service";
import {ResponseAdapter} from "@/presentation/response-adapter";
import {Response} from "express";

@Controller('transactions')
export class TransactionsController {
    constructor(
        private transactionsService: TransactionsService
    ) {
    }

    @Get('')
    async transactions(
        @Res() res: Response
    ) {
        return ResponseAdapter(this.transactionsService, res)
    }
}
