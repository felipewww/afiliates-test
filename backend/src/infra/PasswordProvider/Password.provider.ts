import * as bcrypt from 'bcrypt'

export class PasswordProvider {
    
    constructor() {
    }
    
    public static verify(sent, hash): Promise<any> {
        return bcrypt.compare(sent, hash)
    }
}
