import {Service} from "@/services/service";

export class UploadService extends Service {
    path = '/upload'
    
    upload(file: File) {
        return this.postFile(file)
    }
}