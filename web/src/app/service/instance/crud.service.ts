import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { BaseFilter } from "src/app/data/base/base-filter";
import { ObjetoConId } from "../../data/objeto-con-id";
import { ApiService } from "./api.service";

export abstract class CrudService<Entity extends ObjetoConId, Dto extends ObjetoConId, ListDto extends ObjetoConId, Filter extends BaseFilter> {
    protected readonly api: ApiService<Dto, ListDto, Filter>;

    protected lista: BehaviorSubject<Entity[] | null> = new BehaviorSubject<Entity[] | null>(null);
    protected listaObservable?: Observable<Entity[] | null>;

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

    constructor(api: ApiService<Dto, ListDto, Filter>) {
        this.api = api;
    }

    /** Crea un nuevo item */
    public create(entity: Entity) {
        const itemSinId: Omit<Dto, 'id'> = this.toDto(entity);

        // Crear en server y guardar la instancia del observable
        const obs = this.api.create(itemSinId);

        obs.subscribe((itemServer) => {
            // Obtener lista actual, si es null hacer una lista vacía
            const lista = this.lista.getValue() ?? [];
            // Agregar elemento al principio de la lista
            lista.unshift(this.fromDto(itemServer));

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
        return this.api.getById(id)
            .pipe(map(dto => this.fromDto(dto)));
    }

    /** Edita un item */
    public edit(entity: Entity) {
        const dto = this.toDto(entity);
        const { id, ...sinId } = dto;

        // Actualizar en server y guardar la instancia del observable
        const obs = this.api.updateById(entity.id, sinId);

        obs.subscribe((itemLista) => {
            // Obtener lista actual
            const lista = this.lista.getValue();

            if (lista) {
                // Actualizar localmente el elemento
                const index = lista.findIndex(i => i.id === entity.id);
                lista[index] = this.fromDto(itemLista);

                this.lista.next(lista);
            }
        }, (error: any) => {
            console.error(error);
        });

        // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
        return obs;
    }

    /** Elimina un item */
    public delete(item: Entity) {
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

    /**
     * Devuelve la lista de entidades que coinciden, busca localmente y en el server en caso de no encontrar
     * Puede devolver una mescla de entidades que se encontraron localmente con entidades traidas del server
     * @param ids ids a buscar
     * @returns Entidades con los ids correspondientes
     */
    public getByIds(ids: string[]) {
        // Ids a traer del server
        let idsABuscar = ids;
        // Elementods locales que se pueden reutilizar sin llamar al server
        let locales: Entity[] = [];

        const lista = this.lista.value;

        // Tratar de buscar localmente las entidades con los ids buscados
        if (lista) {
            locales = lista.filter(e => ids.includes(e.id));

            // Se buscarán los ids que no estan localmente
            idsABuscar = ids.filter(id => locales.findIndex(e => e.id == id) == -1);
        }

        if (idsABuscar) {
            return this.getWithFilter({ ids: idsABuscar } as Filter).pipe(
                // Primero convertir a una lista de entidades
                map(listaServer => listaServer.map(listDto => this.fromListDto(listDto))),
                // Luego agregarle las encontradas localmente
                tap(listaServer => {
                    listaServer.push(...locales);
                })
            );
        }
        else {
            return of(locales);
        }
    }

    public getWithFilter(filter: Filter) {
        return this.api.getWithFilter(filter);
    }

    protected abstract fromListDto(listDto: ListDto): Entity;
    protected abstract fromDto(dto: Dto): Entity;
    protected abstract toDto(Entity: Entity): Dto;

    protected getAll() {
        // Obtiene la lista de todos y la convierte a una lista dentidades
        return this.api.getAll()
            .pipe(
                map(lista => lista.map(dto => this.fromListDto(dto)))
            );
    }
}