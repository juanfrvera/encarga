import { BaseError } from "src/base/error/base.error";

export class CategoriaNotFoundError extends BaseError{
    constructor(){
        super('CATEGORIA_NOT_FOUND');
    }
}