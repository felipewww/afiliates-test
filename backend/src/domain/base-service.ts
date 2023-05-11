export abstract class BaseService<Input, Output> {
    abstract handle(so?: Input): Promise<Output>
}