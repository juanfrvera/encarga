import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemTypeOrmModule } from 'src/typeorm/item/item.typeorm.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    BaseModule,
    ItemTypeOrmModule,
  ],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule { }
