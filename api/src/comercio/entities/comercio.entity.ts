export class Comercio {
    id: string;
    url: string;

    /** Categoría a donde van a parar los items sin categoria */
    categoriaDefaultId: string;

    constructor(id: string,url: string){
        this.id = id;
        this.url = url;
    }
}