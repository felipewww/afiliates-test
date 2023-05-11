import {BaseSource} from "@/data/base.source";

export interface IUserModel {
    id: number
    username: string
    password: string
}

export class UsersSource extends BaseSource {
    table = 'users'
    
    // @ts-ignore
    async get(where: { [key: string]: any }): Promise<Array<IUserModel>> {
        
        //todo - ler do banco, esta função nao ficará aqui. apeans para mock e testes iniciais.
        
        return Promise.resolve([{
            id: 1,
            username: 'mock',
            password: 'secret'
        }])
    }
}