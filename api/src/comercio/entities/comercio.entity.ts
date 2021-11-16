import { Categoria } from "src/categoria/entities/categoria.entity";

export class Comercio {
    id: string;
    url: string;

    /** Categoría a donde van a parar los items sin categoria */
    categoriaDefaultId: string;
    categoriaList: Categoria[];

    constructor(id: string,url: string){
        this.id = id;
        this.url = url;
    }
}