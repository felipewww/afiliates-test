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
        return ResponseAdapter(this.customersService, res)
    }
}
