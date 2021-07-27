import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService extends BaseService<Categoria, CreateCategoriaDto, UpdateCategoriaDto> {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriasRepository: Repository<Categoria>) {
        super(categoriasRepository);
    }
}
