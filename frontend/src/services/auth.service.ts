import {Service} from "@/services/service";

export class AuthService extends Service {
    path = '/auth/login'

    async login(username: string, password: string) {
        // todo - criar tratamentos de erro
        const res = await this.post({username, password})
        return res.data.token
        // return Promise.resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5IiwidXNlcm5hbWUiOiJKb2huIERvZSJ9.QLwvzDAI_Wy-b21tn-oYhJycrixA6M-eRKwXR8CIOLs")
    }
}