import {Controller, Get, Param, Res} from '@nestjs/common';
import {CustomersService} from "@/domain/services/customers/customers.service";
import {Response} from "express";
import {ResponseAdapter} from "@/presentation/response-adapter";

@Controller('customers')
export class CustomerController {
    constructor(
        private customersService: CustomersService
    ) {
    }
    
    @Get(':id')
    async customers(
        @Res() res: Response,
        @Param('id') id: number,
    ) {
        return ResponseAdapter(this.customersService, res, { id })
    }
}
