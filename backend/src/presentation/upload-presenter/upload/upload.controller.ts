import {Body, Controller, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {UploadService, UploadServiceSO} from "@/domain/services/upload/upload.service";
import {ResponseAdapter} from "@/presentation/response-adapter";

@Controller('upload')
export class UploadController {
    
    constructor(
        private service: UploadService
    ) {
    }
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    upload(
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        const toDto = () => {
            return 'ok!'
        }
        
        const so: UploadServiceSO = {
            content: file.buffer.toString(),
            filename: file.originalname
        }
        
        return ResponseAdapter(this.service, so, toDto, res)
    }
}
