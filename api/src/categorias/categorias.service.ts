import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { ItemCategoria } from 'src/item-categoria/entities/item-categoria.entity';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { EntityManager, In, Repository } from 'typeorm';
import { CategoriaFilter } from './data/categoria-filter';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService extends BaseService<Categoria, CreateCategoriaDto, CategoriaFilter> {
    constructor(
        @InjectRepository(Categoria)
        readonly categoriasRepository: Repository<Categoria>,
        private readonly itemCategoriaService: ItemCategoriaService) {
        super(categoriasRepository);
    }

    async update(id: number, updateDto: UpdateCategoriaDto) {
        const original = await this.repo.findOneOrFail(id);

        original.nombre = updateDto.nombre ?? original.nombre;

        await this.repo.save(original);

        return original;
    }

    async remove(id: number, manager?: EntityManager) {
        if (manager) {
            await this.itemCategoriaService.removeByCategoriaId(id, manager);
            return super.remove(id, manager);
        }
        else {
            return this.repo.manager.transaction(async newManager => {
                await this.itemCategoriaService.removeByCategoriaId(id, newManager);
                return super.remove(id, newManager);
            });
        }
    }

    /**
     * 
     * @param filter 
     * @param manager usado en transacciones 
     */
    findAllWithFilter(filter: CategoriaFilter, manager?: EntityManager) {
        const query = (manager ? manager.createQueryBuilder<Categoria>(this.repo.target, 'categoria') :
            this.repo.createQueryBuilder('categoria'))
            .select();

        if (filter.ids) {
            query.andWhereInIds(filter.ids);
        }

        if (filter.urlComercio) {
            query.leftJoin('categoria.comercio', 'comercio')
                .andWhere('comercio.url = :urlComercio', { urlComercio: filter.urlComercio });
        }

        if (filter.vacias !== undefined) {
            if (filter.vacias) {
                query.leftJoin('categoria.itemCategorias', 'itemcategoria')
                    .andWhere('itemcategoria IS NULL');
            }
            else {
                query.leftJoin('categoria.itemCategorias', 'itemcategoria')
                    .andWhere('itemcategoria IS NOT NULL');
            }
        }

        return query.getMany();
    }

    fromCreateDto(dto: CreateCategoriaDto) {
        const cat = new Categoria();
        cat.nombre = dto.nombre;

        return cat;
    }

    async existenYSonDeComercio(idsCategorias: number[], idComercio: number) {
        // Cuenta las categorias encontradas que cumplen
        const cantidadValidas = await this.repo.count({
            where:
            {
                id: In(idsCategorias),
                comercio: { id: idComercio }
            }
        });

        return cantidadValidas == idsCategorias.length;
    }
}
