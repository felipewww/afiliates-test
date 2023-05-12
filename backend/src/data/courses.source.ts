import {BaseSource} from "@/data/base.source";

export interface ICourseModel {
    id: number,
    title: string,
}

export class CoursesSource extends BaseSource {
    table = 'courses'
    
    async createByTitle(data: Array<string>) {
        
        const toInsert = data.map(title => {
            return { id: null, title }
        })
        
        const query = this.db
            .insert()
            .into(this.table)
            .values(toInsert)
            .orIgnore()
        
        return query.execute();
    }
    
    async getByTitle(titles: Array<string>) {
        const query = this.db
            .select('*')
            .from(this.table, 'a')
            .andWhere('a.title IN (:...titles)')
            .setParameter('titles', titles)
        
        return query.execute()
    }
}