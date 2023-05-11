import {Body, Controller, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    upload(
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        console.log('file on upload!')
        console.log(file)
        
        return res.send(true)
    }
}
