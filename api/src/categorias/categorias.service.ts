import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CategoriaFilter } from './data/categoria-filter';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService extends BaseService<Categoria, CreateCategoriaDto, UpdateCategoriaDto, CategoriaFilter> {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriasRepository: Repository<Categoria>) {
        super(categoriasRepository);
    }

    async update(id: number, updateDto: UpdateCategoriaDto) {
        const original = await this.repo.findOne(id);

        original.nombre = updateDto.nombre ?? original.nombre;

        await this.repo.save(original);

        return original;
    }
}
