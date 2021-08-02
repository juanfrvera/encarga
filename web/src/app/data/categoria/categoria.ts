import { BehaviorSubject, Observable } from "rxjs";
import { CategoriaService } from "src/app/service/categoria.service";
import { Util } from "src/app/util";
import { Item } from "../item/item";
import { IItem } from "../item/item.dto";
import { CategoriaList } from "./categoria-list";
import { ICategoria } from "./categoria.dto";

export class Categoria implements ICategoria {
    id: string;
    nombre: string;

    private items: BehaviorSubject<IItem[] | null> = new BehaviorSubject<IItem[] | null>(null);
    private itemsObservable?: Observable<IItem[] | null>;

    public get Items() {
        // La primera vez, items va a ser null
        if (!this.itemsObservable) {
            this.itemsObservable = this.items.asObservable();
            // Consultar al servidor los items reales, cuando estos vengan, avisarle a los suscriptores
            this.categoriaService.getItems(this.id)
                .subscribe(items => this.items.next(items));
        }

        // Se devuelve este que será compartido por todos
        return this.itemsObservable;
    }

    constructor(id: string, nombre: string, private categoriaService: CategoriaService) {
        this.id = id;
        this.nombre = nombre;
    }

    static fromDto(dto: ICategoria, categoriaService: CategoriaService) {
        return new Categoria(dto.id, dto.nombre, categoriaService);
    }
    static fromListDto(dto: CategoriaList, categoriaService: CategoriaService) {
        return new Categoria(dto.id, dto.nombre, categoriaService);
    }
    static toDto(c: Categoria) {
        return { id: c.id, nombre: c.nombre } as ICategoria;
    }

    public nuevoItem(item: Item) {
        const lista = this.items.value;

        // Si hay lista local es porque no se está pidiendo al server los items
        if (lista) {
            lista.push(item);

            // Informar a suscriptores
            this.items.next(lista);
        }
        // Si se está pidiendo al server no hace falta agregarlo ya que el server lo devolverá
    }

    public itemEliminado(item: Item) {
        const lista = this.items.value;

        // Si hay lista local es porque no se está pidiendo al server los items
        if (lista) {
            const indice = lista.findIndex(i => i.id == item.id);

            // Solo eliminar el item si existe en la lista
            if (indice != -1) {
                Util.eliminarEn(lista, indice);

                // Informar a suscriptores
                this.items.next(lista);
            }
        }
    }

}