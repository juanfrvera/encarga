import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/items/entities/item.entity";
import { Entity, Repository } from "typeorm";
import { ItemAdminService } from "./item-admin.service";
import { ItemCreateData } from "./service-data/item-create.data";
import { ItemData } from "./service-data/item-data";

export class ItemAdminConcreteService extends ItemAdminService {
    constructor(
        @InjectRepository(Item)
        private readonly repo: Repository<Item>
    ) {
        super();
    }

    public async all(urlComercio: string) {
        const list = await this.getQuery(urlComercio).getMany();

        return list.map(i => {
            return {
                id: i.id
            } as ItemData
        });
    }

    public count(urlComercio: string) {
        return this.getQuery(urlComercio).getCount();
    }

    public async create(creationData: ItemCreateData) {
        const entity = new Item();

        entity.descripcion = creationData.descripcion;
        entity.titulo = creationData.titulo;

        const savedEntity = await this.repo.save(entity);

        const returnedData: ItemData = {
            id: savedEntity.id,
            descripcion: savedEntity.descripcion,
            titulo: savedEntity.titulo
        }

        return returnedData;
    }

    private getQuery(urlComercio: string) {
        const query = this.repo.createQueryBuilder('item');

        query.leftJoin('item.itemCategorias', 'itemCategoria')
            .leftJoin('itemCategoria.categoria', 'categoria')
            .leftJoin('categoria.comercio', 'comercio')
            .andWhere('comercio.url = :urlComercio', { urlComercio: urlComercio });

        return query;
    }
}