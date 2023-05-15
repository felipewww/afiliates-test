import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";
import {CustomersSource} from "@/data/customers.source";
import {CoursesSource, ICourseModel} from "@/data/courses.source";
import {TransactionEntity} from "@/domain/entities/Transaction.entity";
import {CustomerEntity} from "@/domain/entities/Customer.entity";
import {CustomerTransactionsComposite} from "@/domain/entities/CustomerTransactionsComposite";
import {UploadsSource} from "@/data/uploads.source";
import {TransactionsRepo} from "@/domain/repositories/Transactions.repo";
import {ETransactionType, ICustomer} from "common-types";

interface ILineParsed {
    type: ETransactionType,
    date: string,
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
    
    // Used to Index all Composites by CustomerName making easy to find Composite by CustomerName
    private compoundsIndexed: { [key: string]: CustomerTransactionsComposite } = {}
    
    constructor(
        private customersSource: CustomersSource,
        private coursesSource: CoursesSource,
        private uploadsSource: UploadsSource,
        private transactionsRepo: TransactionsRepo,
        
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
            
            // Index the courses by name, in the future these id's will be filled with real ids from database selection.
            if (!this.courses[product]) {
                this.courses[product] = {
                    id: null,
                    title: product
                }
            }
            
            let customerTransactionsComposite = this.getCustomerTransactionsComposite(customerName)
            
            customerTransactionsComposite.addTransaction(new TransactionEntity(
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
        
        let uploadId: number
        
        try {
            // todo - colocar transactions nas queries
            
            const insertResult = await this.uploadsSource.create({
                filename: so.filename,
                datetime: new Date().toISOString()
            })
            
            const uploadRes = await this.transactionsRepo.save(
                this.compoundsIndexed,
                insertResult.raw.insertId
            )
            
            uploadId = uploadRes.raw.insertId;
            
            for (let key of Object.keys(this.compoundsIndexed)) {
                let customer = this.compoundsIndexed[key].customer;
                await this.customersSource.changeCurrentCredits(customer.id, customer.currentCredits)
            }
            
        } catch (e) {
            // todo - tratar e repassar erro de banco de dados.
            console.log('ops!!!!!!!!!!')
            console.log(e)
        }
        
        return Promise.resolve(uploadId);
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
            date,
            product,
            price,
            priceConverted,
            customerName,
        }
    }
    
    private getCustomerTransactionsComposite(customerName: string) {
        let customerTransactionsComposite = this.compoundsIndexed[customerName];
        
        if (!customerTransactionsComposite) {
            customerTransactionsComposite = new CustomerTransactionsComposite(
                new CustomerEntity(null, customerName),
            )
            
            // add to indexed managers by customer name
            this.compoundsIndexed[customerName] = customerTransactionsComposite;
        }
        
        return customerTransactionsComposite
    }
    
    /*
    * Users and courses have no id in file structure.
    * This method finds users and courses id's by sent names (extract from file), then fill ids com database into current object.
    * */
    private async associateDbIntoSellers() {
        
        const customersNames = Object.keys(this.compoundsIndexed)
        await this.customersSource.createByUsername(customersNames)
        const customersFromDB: Array<ICustomer> = await this.customersSource.getByUsername(customersNames)
        
        const coursesTitles = Object.keys(this.courses);
        await this.coursesSource.createByTitle(coursesTitles)
        const coursesFromDB: Array<ICourseModel> = await this.coursesSource.getByTitle(coursesTitles)
        
        for (let customerRow of customersFromDB) {
            let customerTransactionsComposite = this.getCustomerTransactionsComposite(customerRow.name)
            customerTransactionsComposite.customer.id = customerRow.id
        }
        
        for (let courseRow of coursesFromDB) {
            this.courses[courseRow.title].id = courseRow.id
        }
    }
}
