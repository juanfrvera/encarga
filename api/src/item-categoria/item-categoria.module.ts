import { Module } from '@nestjs/common';
import { ItemCategoriaService } from './item-categoria.service';
import { ItemCategoriaController } from './item-categoria.controller';
import { ItemModule } from 'src/item/item.module';
import { ItemCategoriaTypeOrmModule } from 'src/typeorm/item-categoria/item-categoria.typeorm.module';

@Module({
  imports: [
    ItemModule,
    ItemCategoriaTypeOrmModule
  ],
  controllers: [ItemCategoriaController],
  providers: [
    ItemCategoriaService,
  ],
  exports: [ItemCategoriaService]
})
export class ItemCategoriaModule { }
