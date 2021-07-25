import { BehaviorSubject, Observable } from "rxjs";
import { ObjetoConId } from "../../data/objeto-con-id";
import { ApiService } from "../api.service";

export abstract class CrudService<ConId extends ObjetoConId> {
    protected readonly api: ApiService<ConId>;

    protected items: BehaviorSubject<ConId[] | null> = new BehaviorSubject<ConId[] | null>(null);
    protected itemsObservable?: Observable<ConId[] | null>;

    public get Items() {
        // La primera vez, items va a ser null
        if (!this.itemsObservable) {
            this.itemsObservable = this.items.asObservable();
            // Consultar al servidor los items reales, cuando estos vengan, avisarle a los suscriptores
            this.getAll().subscribe(items => this.items.next(items));
        }

        // Se devuelve este que será compartido por todos
        return this.itemsObservable;
    }

    constructor(api: ApiService<ConId>) {
        this.api = api;
    }

    /** Crea un nuevo item */
    public create(itemSinId: Omit<ConId, 'id'>): Observable<ConId> {
        // Crear en server y guardar la instancia del observable
        const obs = this.api.create(itemSinId);

        obs.subscribe((itemServer) => {
            // Obtener lista actual, si es null hacer una lista vacía
            const lista = this.items.getValue() ?? [];
            // Agregar elemento al principio de la lista
            lista.unshift(itemServer);

            // Informar nueva lista a los suscriptores
            this.items.next(lista);
        }, error => {
            console.error(error);
        });

        // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
        return obs;
    }

    /** Edita un item */
    public edit(item: ConId): Observable<ConId> {
        const { id, ...sinId } = item;

        // Actualizar en server y guardar la instancia del observable
        const obs = this.api.updateById(item.id, sinId);

        obs.subscribe(() => {
            // Obtener lista actual
            const lista = this.items.getValue();

            if (lista) {
                // Actualizar localmente el elemento
                const index = lista.findIndex(i => i.id === item.id);
                lista[index] = item;

                this.items.next(lista);
            }
        }, (error: any) => {
            console.error(error);
        });

        // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
        return obs;
    }

    /** Elimina un item */
    public delete(item: ConId): Observable<ConId> {
        // Eliminar en server y guardar la instancia del observable
        const obs = this.api.deleteById(item.id);

        obs.subscribe(() => {
            const lista = this.items.getValue();

            // Solo eliminar localmente si el item está en la lista y la lista existe
            if (lista) {
                // Eliminar elemento localmente
                const index = lista.findIndex(i => i.id === item.id);
                lista.splice(index, 1);

                // Informar nueva lista a los suscriptores
                this.items.next(lista);
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