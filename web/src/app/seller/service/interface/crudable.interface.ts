export interface ICrudable<Full, Lite> {
    create(data: any): Promise<Lite>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<Full>;
    update(data: any): Promise<Lite>;
    getList(): Promise<Array<Lite>>;
}