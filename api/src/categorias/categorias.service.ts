import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { EntityManager, Repository } from 'typeorm';
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
        const original = await this.repo.findOne(id);

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
}
