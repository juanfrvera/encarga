import { BaseError } from "src/base/error/base.error";

export class NoComercioUrlError extends BaseError {
    constructor() {
        super('NO_COMERCIO_URL');
    }
}