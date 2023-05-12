import {Controller, Get, Res} from '@nestjs/common';
import {CustomersService} from "@/domain/services/customers/customers.service";
import {Response} from "express";
import {ResponseAdapter} from "@/presentation/response-adapter";

@Controller('customer')
export class CustomerController {
    constructor(
        private customersService: CustomersService
    ) {
    }
    
    @Get('customers')
    async customers(
        @Res() res: Response
    ) {
        const toDto = () => {
            return 'ok!'
        }
        
        // const so: UploadServiceSO = {
        //     content: file.buffer.toString(),
        //     filename: file.originalname
        // }
        
        return ResponseAdapter(this.customersService, null, toDto, res)
    }
}
