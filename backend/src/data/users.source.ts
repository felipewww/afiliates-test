import {BaseSource} from "@/data/base.source";
import {UserEntity} from "@/domain/entities/User.entity";

export interface IUserModel {
    id: number
    username: string
    password: string
}

export class UsersSource extends BaseSource {
    table = 'users'
}