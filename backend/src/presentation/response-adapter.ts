import {BaseService} from "@/domain/base-service";
import {Response} from "express";
import {DomainError} from "@/domain/DomainErrors";
import {HttpStatus} from "@nestjs/common";

export async function ResponseAdapter<Input, DTO>(service: BaseService<Input, any>, so: any, toDtoFn: Function, res: Response): Promise<Response<DTO>> {
    try {
        const serviceRes = await service.handle(so)
        const dto = toDtoFn(serviceRes) as DTO
        
        return res.json(dto)
    } catch (e) {
        if (e instanceof DomainError) {
            res.status(HttpStatus.BAD_REQUEST)
            return res.json({
                error: {
                    name: e.constructor.name,
                    message: e.message
                }
            })
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}