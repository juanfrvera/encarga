import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/items/entities/item.entity";
import { Repository } from "typeorm";

export class ItemAdminService {
    constructor(
        @InjectRepository(Item)
        private readonly repo: Repository<Item>
    ) {

    }

    all(urlComercio: string) {
        return this.getQuery(urlComercio).getMany();
    }

    count(urlComercio: string) {
        return this.getQuery(urlComercio).getCount();
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