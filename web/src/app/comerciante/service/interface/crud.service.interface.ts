import { Observable } from "rxjs";

export interface ICrudService {
    create(data: any): Observable<any>;
    delete(id: string): Observable<void>;
    get(id: string): Observable<any>;
    getList(): Observable<Array<any>>;
    update(data: any): Observable<any>;
}