import {Controller, Get, Res} from '@nestjs/common';
import {CustomersService} from "@/domain/services/customers/customers.service";
import {Response} from "express";
import {ResponseAdapter} from "@/presentation/response-adapter";

@Controller('customers')
export class CustomerController {
    constructor(
        private customersService: CustomersService
    ) {
    }
    
    @Get()
    async customers(
        @Res() res: Response
    ) {
        return ResponseAdapter(this.customersService, res)
    }
}
