import { Observable } from "rxjs";

export interface ICrudable {
    create(data: any): Observable<any>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<any>;
    getList$(): Observable<Array<any> | undefined>;
    update(data: any): Promise<any>;
}