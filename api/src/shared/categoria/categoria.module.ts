import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { ItemCategoriaModule } from 'src/item-categoria/item-categoria.module';
import { UsuarioComercioModule } from 'src/usuario-comercio/usuario-comercio.module';
import { CategoriaTypeOrmModule } from 'src/typeorm/categoria/categoria.typeorm.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    BaseModule,
    ItemCategoriaModule,
    UsuarioComercioModule,
    CategoriaTypeOrmModule,
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService]
})
export class CategoriaModule { }
