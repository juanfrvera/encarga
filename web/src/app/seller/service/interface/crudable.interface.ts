import { Observable } from "rxjs";

export interface ICrudable {
    create(data: any): Promise<any>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<any>;
    update(data: any): Promise<any>;
    getList(): Promise<Array<any>>;
}