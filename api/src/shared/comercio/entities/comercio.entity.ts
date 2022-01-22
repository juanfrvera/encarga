export class Comercio {
    private _id: string;
    private _phone: string;
    private _url: string;

    // Accesors
    public get id(): string {
        return this._id;
    }
    public get phone(): string {
        return this._phone;
    }
    public get url(): string {
        return this._url;
    }

    constructor(id: string, phone: string, url: string) {
        this._id = id;
        this._phone = phone;
        this._url = url;
    }
}