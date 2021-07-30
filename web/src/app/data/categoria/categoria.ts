import { BehaviorSubject, Observable } from "rxjs";
import { ItemService } from "src/app/service/item.service";
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
            this.itemService.getWithFilter({ idsCategorias: [this.id] })
                .subscribe(items => this.items.next(items));
        }

        // Se devuelve este que será compartido por todos
        return this.itemsObservable;
    }

    constructor(private itemService: ItemService) { }

    static fromDto(dto: ICategoria) {
        return { id: dto.id, nombre: dto.nombre } as Categoria;
    }
    static fromListDto(dto: CategoriaList, itemService: ItemService) {
        const cat = new Categoria(itemService);
        cat.id = dto.id;
        cat.nombre = dto.nombre;
        return cat;
    }
    static toDto(c: Categoria) {
        return { id: c.id, nombre: c.nombre } as ICategoria;
    }

}