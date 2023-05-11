import {UsersSource} from "@/data/users.source";
import {UserEntity} from "@/domain/entities/User.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UsersRepo {
    constructor(
        private source: UsersSource
    ) {
    }
    
    async getByUsername(username: string): Promise<{ entity: UserEntity, dbPwd: string }> {
        let entity, dbPwd;
        
        const sourceResult = await this.source.get({username})
        
        if (sourceResult.length) {
            entity = new UserEntity(
                sourceResult[0].id,
                sourceResult[0].username
            )
            
            dbPwd = sourceResult[0].password
        }
        
        return {entity, dbPwd};
    }
}