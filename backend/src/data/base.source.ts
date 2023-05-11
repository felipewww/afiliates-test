export abstract class BaseSource {
    abstract table: string
    
    async get<T>(where: { [key: string]: any }): Promise<Array<T>> {
        return Promise.resolve([])
    }
}