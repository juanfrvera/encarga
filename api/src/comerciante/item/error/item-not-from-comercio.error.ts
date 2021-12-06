import { BaseError } from "src/base/error/base.error";

export class ItemNotFromComercioError extends BaseError {
    constructor() {
        super('ITEM_NOT_FROM_COMERCIO_ERROR');
    }
}