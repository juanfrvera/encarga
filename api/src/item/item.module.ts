import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { UsuarioComercioModule } from 'src/comerciante/usuario-comercio/usuario-comercio.module';
import { ItemTypeOrmModule } from 'src/typeorm/item/item.typeorm.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    UsuarioComercioModule,
    BaseModule,
    ItemTypeOrmModule,
  ],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule { }
