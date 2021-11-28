import { BaseError } from "src/base/error/base.error"

export class ComercioNotValidError extends BaseError {
    constructor() {
        super('COMERCIO_NOT_VALID_ERROR');
    }
}