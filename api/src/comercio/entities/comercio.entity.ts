import { Categoria } from "src/categoria/entities/categoria.entity";
import { UsuarioComercio } from "src/usuario-comercio/entities/usuario-comercio.entity";

export class Comercio {
    url: string;

    /** Categoría a donde van a parar los items sin categoria */
    categoriaDefecto: Categoria;
    categorias: Categoria[];

    /** Usuarios de este comercio */
    usuarioComercios: UsuarioComercio[];
}