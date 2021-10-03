import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { BaseFilter } from "src/app/data/base/base-filter";
import { Util } from "src/app/util";
import { ObjetoConId } from "../../data/objeto-con-id";
import { ApiService } from "./api.service";

export abstract class CrudService
    <Entity extends ObjetoConId, Dto extends ObjetoConId, ListDto extends ObjetoConId, Filter extends BaseFilter>
    extends ApiService<Dto, ListDto, Filter> {

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

    constructor(protected readonly http: HttpClient, route: string) {
        super(route);
    }

    /** Crea un nuevo item */
    public create(dto: Dto) {
        const sinId: Omit<Dto, 'id'> = dto;

        // Crear en server y guardar la instancia del observable
        return this.http.post<ListDto>(ApiService.Url + this.Route, sinId).pipe(
            map(listDto => this.fromListDto(listDto)),
            tap(itemServer => {
                // Obtener lista actual, si es null hacer una lista vacía
                const lista = this.lista.getValue() ?? [];
                // Agregar elemento al principio de la lista
                lista.unshift(itemServer);

                // Informar nueva lista a los suscriptores
                this.lista.next(lista);
            })
        );
    }

    /** Devuelve un dto fresco (traido del servidor) y es de tipo completo, no liviano */
    public getById(id: string) {
        return this.http.get<Dto>(ApiService.Url + this.Route + id);
    }

    /**
     * Edita una entidad
     * @param entity 
     * @returns Observable que puede ser suscripto varias veces sin problemas (sin volver a llamar a la edición)
     */
    public edit(dto: Dto) {
        const { id, ...sinId } = dto;

        // Actualizar en server y guardar la instancia del observable
        return this.http.patch<ListDto>(ApiService.Url + this.Route + dto.id, sinId).pipe(
            map(listDto => this.fromListDto(listDto)),
            tap({
                next: itemServer => {
                    // Obtener lista actual
                    const lista = this.lista.getValue();

                    if (lista) {
                        // Actualizar localmente el elemento
                        const index = lista.findIndex(i => i.id === dto.id);
                        lista[index] = itemServer;

                        this.lista.next(lista);
                    }
                },
                error: err => {
                    console.error(err);
                }
            })
        );
    }

    /** Elimina un item */
    public delete(itemId: string) {
        return this.http.delete<void>(ApiService.Url + this.Route + itemId).pipe(
            tap(() => {
                const lista = this.lista.getValue();

                // Solo eliminar localmente si el item está en la lista y la lista existe
                if (lista) {
                    // Eliminar elemento localmente
                    const index = lista.findIndex(i => i.id === itemId);
                    Util.eliminarEn(lista, index);

                    // Informar nueva lista a los suscriptores
                    this.lista.next(lista);
                }
            })
        );
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
        return this.http.post<ListDto[]>(ApiService.Url + this.Route + 'filter', filter);
    }

    protected getAll() {
        // Obtiene la lista de todos y la convierte a una lista dentidades
        return this.http.get<ListDto[]>(ApiService.Url + this.Route).pipe(
            map(lista => lista.map(listDto => this.fromListDto(listDto)))
        );
    }

    protected abstract fromListDto(listDto: ListDto): Entity;
    protected abstract fromDto(dto: Dto): Entity;
    protected abstract toDto(Entity: Entity): Dto;
}