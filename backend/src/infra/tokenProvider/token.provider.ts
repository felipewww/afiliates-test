import * as jwt from 'jsonwebtoken'
import {ITokenPayload} from "common-types";
import * as process from "process";

//todo - trocar service por PROVIDER
export class TokenProvider {
    validate(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    
    create(payload: ITokenPayload) {
        return jwt.sign(payload, process.env.JWT_SECRET)
    }
}
