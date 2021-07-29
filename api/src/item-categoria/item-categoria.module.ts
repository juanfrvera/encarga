import { Module } from '@nestjs/common';
import { ItemCategoriaService } from './item-categoria.service';
import { ItemCategoriaController } from './item-categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategoria } from './entities/item-categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCategoria])],
  controllers: [ItemCategoriaController],
  providers: [ItemCategoriaService],
  exports: [ItemCategoriaService]
})
export class ItemCategoriaModule { }
