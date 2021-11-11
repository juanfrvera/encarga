import { forwardRef, Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategoriaModule } from 'src/item-categoria/item-categoria.module';
import { ComercioModule } from 'src/comercio/comercio.module';
import { UsuarioComercioModule } from 'src/usuario-comercio/usuario-comercio.module';
import { CategoriaTypeOrmModel } from './storage/categoria.typeorm.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriaTypeOrmModel]),
    ItemCategoriaModule, forwardRef(() => ComercioModule),
    UsuarioComercioModule
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService]
})
export class CategoriaModule { }
