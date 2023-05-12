import {BaseSource} from "@/data/base.source";

export interface IUserModel {
    id: number
    username: string
    password: string
}

export class UsersSource extends BaseSource {
    table = 'users'
}