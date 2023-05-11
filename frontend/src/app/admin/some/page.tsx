'use client'

import TemplateAdmin from "@/components/TemplateAdmin";
import Link from "next/link";
import {useState} from "react";
import {UploadService} from "@/services/upload.service";

export default () => {
    const [file, setFile] = useState<File>();
    
    const handleUpload = () => {
        if (!file) {
            return;
        }
        
        const service = new UploadService()
        service.upload(file)
    };
    
    return (
        <TemplateAdmin>
            <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
            
            <button onClick={handleUpload}>Upload</button>
            
            <Link href={'/admin'}>
                To Home
            </Link>
        </TemplateAdmin>
    )
}