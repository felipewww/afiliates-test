'use client'

import TemplateAdmin from "@/components/TemplateAdmin";
import {useState} from "react";
import {UploadService} from "@/services/upload.service";
import {TransactionsService} from "@/services/transactions.service";
import {ICustomer, ITransaction} from "../../../../common-types/src/domain/CustomerTransactionsCompound";
import {CustomersService} from "@/services/customers.service";
import Transactions from "@/components/transactions.component";
import CustomerInfoComponent from "@/components/customer-info.component";
import If from "@/components/If";
import css from './page.module.css'

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
            .then(async (res) => {
                readLastTransactions()
            })
    };
    
    const readLastTransactions = async () => {
        const service = new TransactionsService();
        const res: {data: Array<ITransaction>} = await service.get()
        setTransactions(res.data)
    }
    
    return (
        <>
            <TemplateAdmin>
                {/*<input type='file' onChange={(e) => setFile(e.target.files[0])}/>*/}
                
                <div style={ {position: "relative", width: '700px', margin: "0 auto" } }>
                    <input
                        className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file" />
                    
                    <button className={css.btnAction} onClick={handleUpload}>Upload</button>
                </div>
                
                {
                    customer ?
                        <CustomerInfoComponent customer={customer}></CustomerInfoComponent>
                        : null
                }
                
                <If cond={transactions.length}>
                    <Transactions transactions={transactions} selectCustomer={selectCustomer}></Transactions>
                </If>
                
                {/*<button type="button" onClick={readLastTrans}>READ LAST TRANS</button>*/}
                
            </TemplateAdmin>
        </>
    )
}