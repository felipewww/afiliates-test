import { Injectable } from '@nestjs/common';
import {UsersRepo} from "@/domain/repositories/Users.repo";
import {InvalidPassword, NotAuthorized} from "@/domain/DomainErrors";
import {TokenProvider} from "@/infra/TokenProvider/Token.provider";
import {BaseService} from "@/domain/base-service";
import {PasswordProvider} from "@/infra/PasswordProvider/Password.provider";

export interface AuthServiceSO {
    username: string,
    password: string
}

@Injectable()
export class AuthService extends BaseService<AuthServiceSO, string> {
    constructor(
        private repo: UsersRepo,
        private tokenService: TokenProvider
    ) {
        super()
    }
    
    async handle(serviceObject: AuthServiceSO): Promise<string> {
        const {entity,dbPwd} = await this.repo.getByUsername(serviceObject.username)
        
        if (!entity) {
            throw new NotAuthorized()
        }
        
        await this.validatePassword(serviceObject.password, dbPwd)
        
        return this.tokenService.create({
            id: entity.id,
            username: entity.username
        })
    }
    
    private async validatePassword(sentPwd: string, dbPwd: string) {
        const pwdValidate = await PasswordProvider.verify(sentPwd, dbPwd)
        
        if (!pwdValidate) {
            throw new InvalidPassword()
        }
    }
}
