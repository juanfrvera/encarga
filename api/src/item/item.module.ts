import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { UsuarioComercioModule } from 'src/usuario-comercio/usuario-comercio.module';
import { ItemTypeOrmModule } from 'src/typeorm/item/item.typeorm.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    UsuarioComercioModule,
    BaseModule,
    ItemTypeOrmModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule { }
