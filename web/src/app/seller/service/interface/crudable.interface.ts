export interface ICrudable<Full, Lite> {
    create(data: any): Promise<Lite>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<Full>;
    update(id: string, data: Partial<any>): Promise<Lite>;
    getList(): Promise<Array<Lite>>;
}