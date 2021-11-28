import { BaseError } from "src/base/error/base.error";

export class NoComercioError extends BaseError{
    constructor(){
        super('NO_COMERCIO_ERROR');
    }
}