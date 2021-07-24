import { Observable } from "rxjs";
import { ApiService } from "../api.service";

export abstract class CrudService<SinId, ConId>{
    protected readonly api: ApiService<SinId, ConId>;

    public abstract get Items(): Observable<ConId[] | null>;

    constructor(api: ApiService<SinId, ConId>) {
        this.api = api;
    }

    public abstract create(itemSinId: SinId): Observable<ConId>;
    public abstract edit(item: ConId): Observable<ConId>;
    public abstract delete(item: ConId): Observable<ConId>;
}