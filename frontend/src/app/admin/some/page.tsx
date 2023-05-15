'use client'

import TemplateAdmin from "@/components/TemplateAdmin";
import Link from "next/link";
import {useState} from "react";
import {UploadService} from "@/services/upload.service";
import {TransactionsService} from "@/services/transactions.service";
import {ITransaction} from "../../../../../common-types/src/domain/CustomerTransactionsCompound";

export default () => {
    const [file, setFile] = useState<File>();
    
    const handleUpload = () => {
        if (!file) {
            return;
        }
        
        const service = new UploadService()
        service.upload(file)
    };
    
    const readLastTrans = async () => {
        const service = new TransactionsService();
        const res2: {data: Array<ITransaction>} = await service.get()
        console.log(res2)
    }
    
    return (
        <TemplateAdmin>
            <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
            
            <button onClick={handleUpload}>Upload</button>
            
            <Link href={'/admin'}>
                To Home
            </Link>
            
            <hr />
            
            <button type="button" onClick={readLastTrans}>READ LAST TRANS</button>
        </TemplateAdmin>
    )
}