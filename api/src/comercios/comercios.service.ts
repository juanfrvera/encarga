import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { BaseFilter } from 'src/base/data/base-filter';
import { CategoriasService } from 'src/categorias/categorias.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateComercioDto } from './dto/create-comercio.dto';
import { Comercio } from './entities/comercio.entity';

@Injectable()
export class ComerciosService extends BaseService<Comercio, CreateComercioDto, BaseFilter> {
    constructor(
        @InjectRepository(Comercio) readonly comercioRepository: Repository<Comercio>,
        private readonly categoriaService: CategoriasService) {
        super(comercioRepository);
    }

    /**
     * Crea un comercio junto con su categoría por defecto
     * @param createDto dto de creación
     * @param manager En caso de que se esté dentro de una transacción
     * @returns Comercio creado
     */
    async create(createDto: CreateComercioDto, manager?: EntityManager) {
        const _create = async (mng: EntityManager) => {
            const comercio = new Comercio();

            comercio.url = createDto.url;
            comercio.categoriaDefecto = await this.categoriaService.create({ nombre: 'default' }, mng);

            return mng.save(comercio);
        }

        if (manager) {
            return _create(manager);
        }
        else {
            return this.repo.manager.transaction(myManager => {
                return _create(myManager);
            });
        }
    }

    findOneByUrl(url: string, relations?: string[]) {
        return this.repo.findOne({ where: { url }, relations });
    }

    update(id: number, updateDto: Partial<CreateComercioDto>) {
        throw new Error('Method not implemented.');
    }

    fromCreateDto(dto: CreateComercioDto): Comercio {
        throw new Error('Method not implemented.');
    }
}
