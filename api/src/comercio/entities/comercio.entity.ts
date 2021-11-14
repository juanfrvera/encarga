import { Categoria } from "src/categoria/entities/categoria.entity";
import { UsuarioComercio } from "src/usuario-comercio/entities/usuario-comercio.entity";

export class Comercio {
    id: string;
    url: string;
    categorias: Categoria[];

    /** Categoría a donde van a parar los items sin categoria */
    categoriaDefectoId: string;

    /** Usuarios de este comercio */
    usuarioComercios: UsuarioComercio[];

    constructor(
        id: string,
        url: string,
        categorias: Categoria[],
        categoriaDefectoId: string,
        usuarioComercios? : UsuarioComercio[]){
            this.id = id;
            this.url = url;
            this.categorias = categorias;
            this.categoriaDefectoId = categoriaDefectoId;
            this.usuarioComercios = usuarioComercios;
    }
}