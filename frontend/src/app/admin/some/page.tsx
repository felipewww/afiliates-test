'use client'

import TemplateAdmin from "@/components/TemplateAdmin";
import Link from "next/link";
import {useRef, useState} from "react";
import {UploadService} from "@/services/upload.service";
import {TransactionsService} from "@/services/transactions.service";
import {ICustomer, ITransaction} from "../../../../../common-types/src/domain/CustomerTransactionsCompound";
import {CustomersService} from "@/services/customers.service";
import Transactions from "@/components/transactions.component";
import CustomerInfoComponent from "@/components/customer-info.component";

export default () => {
    const [file, setFile] = useState<File>();
    const [transactions, setTransactions] = useState<Array<ITransaction>>([])
    const [customer, setCustomer] = useState<ICustomer>(null)
    
    const selectCustomer = async (customer: ICustomer) => {
        const service = new CustomersService();
        const res: {data: Array<ICustomer>} = await service.get(null, customer.id)
        setCustomer(res.data[0])
    }
    
    const handleUpload = () => {
        if (!file) {
            return;
        }
        
        const service = new UploadService()
        service.upload(file)
    };
    
    const readLastTrans = async () => {
        const service = new TransactionsService();
        const res: {data: Array<ITransaction>} = await service.get()
        setTransactions(res.data)
    }
    
    return (
        <TemplateAdmin>
            <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
            
            <button onClick={handleUpload}>Upload</button>
            
            <Link href={'/admin'}>
                To Home
            </Link>
            
            <hr />
            
            <Transactions transactions={transactions} selectCustomer={selectCustomer}></Transactions>
            
            <CustomerInfoComponent customer={customer}></CustomerInfoComponent>
            
            <button type="button" onClick={readLastTrans}>READ LAST TRANS</button>
            
        </TemplateAdmin>
    )
}