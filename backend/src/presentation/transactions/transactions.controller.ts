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

    @Get('transactions')
    async transactions(
        @Res() res: Response
    ) {
        const toDto = () => {
            return 'ok!'
        }
        
        // const so: UploadServiceSO = {
        //     content: file.buffer.toString(),
        //     filename: file.originalname
        // }
        
        return ResponseAdapter(this.transactionsService, null, toDto, res)
    }
}
