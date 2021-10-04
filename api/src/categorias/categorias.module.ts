import { forwardRef, Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategoriaModule } from 'src/item-categoria/item-categoria.module';
import { ComerciosModule } from 'src/comercios/comercios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), ItemCategoriaModule, forwardRef(() => ComerciosModule)],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService]
})
export class CategoriasModule { }
