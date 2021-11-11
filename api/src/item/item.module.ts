import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { ItemCategoriaModule } from 'src/item-categoria/item-categoria.module';
import { ComercioModule } from 'src/comercio/comercio.module';
import { UsuarioComercioModule } from 'src/usuario-comercio/usuario-comercio.module';
import { ItemTypeOrmModel } from './storage/item.typeorm.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemTypeOrmModel]),
    CategoriaModule,
    ComercioModule,
    ItemCategoriaModule,
    UsuarioComercioModule,
  ],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule { }
