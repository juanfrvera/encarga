import { Injectable } from '@nestjs/common';
import { CategoriaService } from 'src/categoria/categoria.service';
import { EntityManager } from 'typeorm';
import { CreateComercioDto } from './dto/create-comercio.dto';
import { Comercio } from './entities/comercio.entity';

@Injectable()
export class ComerciosService {
    constructor(
        private readonly categoriaService: CategoriaService) { }

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

    getByUrl(url: string) {
        return this.repo.findOne({ where: { url }, relations });
    }
}
