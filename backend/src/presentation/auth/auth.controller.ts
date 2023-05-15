import {Controller, Post, Body, Res, HttpStatus} from '@nestjs/common';
import {ILoginViewModel} from "common-types";
import {AuthService, AuthServiceSO} from "@/domain/services/auth/auth.service";
import {Response} from "express";
import {ResponseAdapter} from "@/presentation/response-adapter";

interface ILoginDto {
    token: string
}

@Controller('auth')
export class AuthController {
    
    constructor(
        private authService: AuthService
    ) {
    }
    
    @Post('login')
    async login(
        @Body() body: ILoginViewModel,
        @Res() res: Response,
    ): Promise<Response<ILoginDto>> {
        // todo - implementar pipe validators para body
        const so: AuthServiceSO = {
            username: body.username,
            password: body.password,
        }
        
        const parseLoginResultDTO = (serviceResult: string): ILoginDto => {
            return {
                token: serviceResult
            }
        }
        
        return ResponseAdapter<AuthServiceSO, ILoginDto>(this.authService, res, so, parseLoginResultDTO)
    }
}
