import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";
import {CustomersSource} from "@/data/customers.source";
import {CoursesSource, ICourseModel} from "@/data/courses.source";
import * as util from "util";
import {TransactionEntity} from "@/domain/entities/Transaction.entity";
import {CustomerEntity, ICustomer} from "@/domain/entities/Customer.entity";
import {CustomerTransactionsManager} from "@/domain/entities/CustomerTransactionsManager";
import {UploadsSource} from "@/data/uploads.source";
import {ETransactionType} from "@/data/transactions.source";
import {TransactionsRepo} from "@/domain/repositories/Transactions.repo";

interface ILineParsed {
    type: ETransactionType,
    date: Date,
    product: string
    price: number
    priceConverted: number,
    customerName: string
}

// todo - não permitir arquivo se:
// afiliado VENDEU e não recebeu comissão

export interface UploadServiceSO {
    content: string,
    filename: string
}

@Injectable()
export class UploadService extends BaseService<UploadServiceSO, any>{
    
    private courses: { [key: string]: ICourseModel } = {}
    
    // This object index customer transactions by "Customers Name"
    private customerTransactionsIndex: { [key: string]: CustomerTransactionsManager } = {}
    
    constructor(
        private customersSource: CustomersSource,
        private coursesSource: CoursesSource,
        private uploadsSource: UploadsSource,
        private transactionsRepo: TransactionsRepo
    ) {
        super();
    }
    
    async handle(so: UploadServiceSO): Promise<any> {
        
        const lines = so.content.split("\n")
        
        for (let i in lines) {
            let line = lines[i]
            
            // ignore blank lines
            if (line === '') {
                continue;
            }
            
            const {
                type,
                date,
                product,
                price,
                customerName,
                priceConverted,
            } = this.parseLine(line)
            
            // Index courses by name, on the future these id's will be filled with real ids from database selection.
            if (!this.courses[product]) {
                this.courses[product] = {
                    id: null,
                    title: product
                }
            }
            
            let customerTransactionsManager = this.getCustomerTransactionsManager(customerName)
            
            customerTransactionsManager.addTransaction(new TransactionEntity(
                type,
                this.courses[product],
                priceConverted,
                date
            ))
        }
        
        try{
            await this.associateDbIntoSellers()
        } catch (e) {
            // todo - tratar e repassar erro de banco de dados.
            console.log('ops!!!!!!!!!!')
            console.log(e)
        }
        
        try {
            // todo - colocar transactions nas queries
            
            const insertResult = await this.uploadsSource.create({
                filename: so.filename,
                datetime: new Date().toISOString()
            })
            
            await this.transactionsRepo.save(
                this.customerTransactionsIndex,
                insertResult.raw.insertId
            )
            
        } catch (e) {
            // todo - tratar e repassar erro de banco de dados.
            console.log('ops!!!!!!!!!!')
            console.log(e)
        }
        
        // console.log(util.inspect(this.customerTransactionsIndex, {showHidden: false, depth: null, colors: true}))
        
        for (let k of Object.keys(this.customerTransactionsIndex)) {
            const manager = this.customerTransactionsIndex[k]
            // manager
        }
        
        return Promise.resolve(undefined);
    }
    
    private parseLine(line: string): ILineParsed {
        const type = parseInt(line[0]);
        const date = line.slice(1,26)
        const product = line.slice(26,56).trim();
        const price = parseInt(line.slice(56,66))
        const customerName = line.slice(66,86)
        
        // prices are sent in cents, here we convert this to units.
        const priceConverted = price / 100;
        
        return {
            type,
            date: new Date(date),
            product,
            price,
            priceConverted,
            customerName,
        }
    }
    
    private getCustomerTransactionsManager(customerName: string) {
        let customerTransactionsManager = this.customerTransactionsIndex[customerName];
        
        if (!customerTransactionsManager) {
            customerTransactionsManager = new CustomerTransactionsManager(
                new CustomerEntity(null, customerName),
            )
            
            // add to indexed managers by customer name
            this.customerTransactionsIndex[customerName] = customerTransactionsManager;
        }
        
        return customerTransactionsManager
    }
    
    /*
    * Users and courses have no id in file estructure.
    * This method finds users and courses id's by sent names (extract from file), then fill ids com database into current object.
    * */
    private async associateDbIntoSellers() {
        
        const customersNames = Object.keys(this.customerTransactionsIndex)
        await this.customersSource.createByUsername(customersNames)
        const customersFromDB: Array<ICustomer> = await this.customersSource.getByUsername(customersNames)
        
        const coursesTitles = Object.keys(this.courses);
        await this.coursesSource.createByTitle(coursesTitles)
        const coursesFromDB: Array<ICourseModel> = await this.coursesSource.getByTitle(coursesTitles)
        
        for (let customerRow of customersFromDB) {
            let customerTransactionsManager = this.getCustomerTransactionsManager(customerRow.name)
            customerTransactionsManager.customer.id = customerRow.id
        }
        
        for (let courseRow of coursesFromDB) {
            this.courses[courseRow.title].id = courseRow.id
        }
    }
}
