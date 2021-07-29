import { BehaviorSubject, Observable } from "rxjs";
import { ObjetoConId } from "../../data/objeto-con-id";
import { ApiService } from "../api.service";

export abstract class CrudService<Dto extends ObjetoConId, ListDto extends ObjetoConId> {
    protected readonly api: ApiService<Dto, ListDto>;

    protected lista: BehaviorSubject<ListDto[] | null> = new BehaviorSubject<ListDto[] | null>(null);
    protected listaObservable?: Observable<ListDto[] | null>;

    public get Lista() {
        // La primera vez, items va a ser null
        if (!this.listaObservable) {
            this.listaObservable = this.lista.asObservable();
            // Consultar al servidor los items reales, cuando estos vengan, avisarle a los suscriptores
            this.getAll().subscribe(lista => this.lista.next(lista));
        }

        // Se devuelve este que será compartido por todos
        return this.listaObservable;
    }

    constructor(api: ApiService<Dto, ListDto>) {
        this.api = api;
    }

    /** Crea un nuevo item */
    public create(itemSinId: Omit<Dto, 'id'>) {
        // Crear en server y guardar la instancia del observable
        const obs = this.api.create(itemSinId);

        obs.subscribe((itemServer) => {
            // Obtener lista actual, si es null hacer una lista vacía
            const lista = this.lista.getValue() ?? [];
            // Agregar elemento al principio de la lista
            lista.unshift(itemServer);

            // Informar nueva lista a los suscriptores
            this.lista.next(lista);
        }, error => {
            console.error(error);
        });

        // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
        return obs;
    }

    /** Devuelve un dto fresco (traido del servidor) y es de tipo completo, no liviano */
    public getById(id: string) {
        return this.api.getById(id);
    }

    /** Edita un item */
    public edit(item: Dto) {
        const { id, ...sinId } = item;

        // Actualizar en server y guardar la instancia del observable
        const obs = this.api.updateById(item.id, sinId);

        obs.subscribe((itemLista) => {
            // Obtener lista actual
            const lista = this.lista.getValue();

            if (lista) {
                // Actualizar localmente el elemento
                const index = lista.findIndex(i => i.id === item.id);
                lista[index] = itemLista;

                this.lista.next(lista);
            }
        }, (error: any) => {
            console.error(error);
        });

        // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
        return obs;
    }

    /** Elimina un item */
    public delete(item: Dto) {
        // Eliminar en server y guardar la instancia del observable
        const obs = this.api.deleteById(item.id);

        obs.subscribe(() => {
            const lista = this.lista.getValue();

            // Solo eliminar localmente si el item está en la lista y la lista existe
            if (lista) {
                // Eliminar elemento localmente
                const index = lista.findIndex(i => i.id === item.id);
                lista.splice(index, 1);

                // Informar nueva lista a los suscriptores
                this.lista.next(lista);
            }
        }, error => {
            console.error(error);
        });

        // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
        return obs;
    }

    protected getAll() {
        return this.api.getAll();
    }
}