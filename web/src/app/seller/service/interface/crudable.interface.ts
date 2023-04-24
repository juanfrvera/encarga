import { Observable } from "rxjs";

export interface ICrudable {
    create(data: any): Observable<any>;
    delete(id: string): Observable<void>;
    get(id: string): Observable<any>;
    getList$(): Observable<Array<any> | undefined>;
    update(data: any): Observable<any>;
}