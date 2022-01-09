export class ComercioCategoria {
    private _comercioId: string;
    private _categoriaId: string;

    public get comercioId() {
        return this._comercioId;
    }

    public get categoriaId() {
        return this._categoriaId;
    }

    constructor(comercioId: string, categoriaId: string) {
        this._comercioId = comercioId;
        this._categoriaId = categoriaId;
    }
}