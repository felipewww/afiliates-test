import {BaseSource} from "@/data/base.source";

export interface IUploadModel {
    id: number,
    datetime: string,
    filename: string
}

export class UploadsSource extends BaseSource {
    table = 'uploads'
    
    create(uploadData: Omit<IUploadModel, 'id'>) {
        const query = this.db
            .insert()
            .into(this.table)
            .values(uploadData)
        
        return query.execute();
    }
    
    // because of typeORM doesn't retrieve last id
    // getLastId() {
    //     const query = this.db
    //         .select('*')
    //         .from(this.table, 'a')
    //         .limit(1)
    //         .orderBy('id', 'DESC')
    //
    //     return query.execute();
    // }
}