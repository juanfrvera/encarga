export class Comercio {
    private _id: string;
    private _url: string;

    // Accesors
    public get id(): string {
        return this._id;
    }
    public get url(): string {
        return this._url;
    }


    constructor(id: string, url: string) {
        this._id = id;
        this._url = url;
    }
}