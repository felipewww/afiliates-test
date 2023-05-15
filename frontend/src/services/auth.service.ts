import {Service} from "@/services/service";

export class AuthService extends Service {
    path = '/auth/login'

    async login(username: string, password: string) {
        // todo - criar tratamentos de erro
        const res = await this.post({username, password})
        return res.data.token
    }
}