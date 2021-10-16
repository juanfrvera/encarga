import { Base } from "src/base/entities/base.entity";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { UsuarioComercio } from "src/usuario-comercio/entities/usuario-comercio.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Comercio extends Base {
    @Column({ unique: true })
    url: string;

    /** Categoría a donde van a parar los items sin categoria */
    @OneToOne(() => Categoria, { eager: true }) @JoinColumn()
    categoriaDefecto: Categoria;

    @OneToMany(() => Categoria, categoria => categoria.comercio)
    categorias: Categoria[];

    /** Usuarios de este comercio */
    @OneToMany(() => UsuarioComercio, usuarioComercio => usuarioComercio.comercio, { nullable: true })
    usuarioComercios: UsuarioComercio[];
}