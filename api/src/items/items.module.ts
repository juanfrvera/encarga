import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { ItemCategoriaModule } from 'src/item-categoria/item-categoria.module';
import { ComerciosModule } from 'src/comercios/comercios.module';
import { UsuarioComercioModule } from 'src/usuario-comercio/usuario-comercio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    CategoriasModule,
    ComerciosModule,
    ItemCategoriaModule,
    UsuarioComercioModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule { }
