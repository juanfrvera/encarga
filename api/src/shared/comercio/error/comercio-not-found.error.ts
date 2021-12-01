import { BaseError } from "src/base/error/base.error";

export class ComercioNotFoundError extends BaseError {
    constructor() {
        super('COMERCIO_NOT_FOUND');
    }
}