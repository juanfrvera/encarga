import { BaseError } from "src/base/error/base.error";

export class ItemNotFoundError extends BaseError{
    constructor(){
        super('ITEM_NOT_FOUND');
    }
}