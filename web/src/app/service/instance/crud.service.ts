import { HttpClient } from "@angular/common/http";
import { BaseFilter } from "src/app/data/base/base-filter";
import { ObjetoConId } from "../../data/objeto-con-id";
import { ApiService } from "./api.service";

export abstract class CrudService
    <Entity extends ObjetoConId, Dto extends ObjetoConId, ListDto extends ObjetoConId, Filter extends BaseFilter>
    extends ApiService {

    constructor(protected readonly http: HttpClient, route: string) {
        super(route);
    }

    /** Crea un nuevo item */
    public create(dto: Dto) {
        const sinId: Omit<Dto, 'id'> = dto;

        // Crear en server y guardar la instancia del observable
        return this.http.post<ListDto>(ApiService.Url + this.Route, sinId);
    }

    public getAll() {
        return this.http.get<ListDto[]>(ApiService.Url + this.Route);
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
        return this.http.patch<ListDto>(ApiService.Url + this.Route + dto.id, sinId);
    }

    /** Elimina un item */
    public delete(itemId: string) {
        return this.http.delete<void>(ApiService.Url + this.Route + itemId);
    }

    /**
     * Devuelve la lista de entidades que coinciden, busca localmente y en el server en caso de no encontrar
     * Puede devolver una mescla de entidades que se encontraron localmente con entidades traidas del server
     * @param ids ids a buscar
     * @returns Entidades con los ids correspondientes
     */
    public getByIds(ids: string[]) {
        return this.getWithFilter({ ids } as Filter);
    }

    public getWithFilter(filter: Filter) {
        return this.http.post<ListDto[]>(ApiService.Url + this.Route + 'filter', filter);
    }
}