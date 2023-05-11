import {Service} from "@/services/service";

export class AuthService extends Service {
    path = '/api/auth'

    login(username: string, password: string) {
        return Promise.resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5IiwidXNlcm5hbWUiOiJKb2huIERvZSJ9.QLwvzDAI_Wy-b21tn-oYhJycrixA6M-eRKwXR8CIOLs")
    }
}