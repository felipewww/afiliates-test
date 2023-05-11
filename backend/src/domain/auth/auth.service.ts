import { Injectable } from '@nestjs/common';
import {UsersRepo} from "@/domain/repositories/Users.repo";
import {InvalidPassword, NotAuthorized} from "@/domain/DomainErrors";
import {TokenService} from "@/infra/password-validator/token.service";
import {BaseService} from "@/domain/base-service";

export interface AuthServiceSO {
    username: string,
    password: string
}

@Injectable()
export class AuthService extends BaseService<AuthServiceSO, string> {
    constructor(
        private repo: UsersRepo,
        private tokenService: TokenService
    ) {
        super()
    }
    
    async handle(serviceObject: AuthServiceSO): Promise<string> {
        const {entity,dbPwd} = await this.repo.getByUsername(serviceObject.username)
        
        if (!entity) {
            throw new NotAuthorized()
        }
        
        
        this.validatePassword(serviceObject.password,dbPwd)
        
        return this.tokenService.create({
            id: entity.id,
            username: entity.username
        })
    }
    
    private validatePassword(sentPwd: string, dbPwd: string) {
        if (sentPwd === dbPwd) {
            return true
        }
        
        throw new InvalidPassword()
    }
}
