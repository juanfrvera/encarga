import { BaseError } from "src/base/error/base.error";

export class CategoriaNotFromComercioError extends BaseError {
    constructor() {
        super('CATEGORIA_NOT_FROM_COMERCIO_ERROR');
    }
}