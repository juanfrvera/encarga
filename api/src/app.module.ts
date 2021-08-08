import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ItemsModule } from './items/items.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ItemCategoriaModule } from './item-categoria/item-categoria.module';
import { ComerciosModule } from './comercios/comercios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ItemsModule,
    CategoriasModule,
    ItemCategoriaModule,
    ComerciosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
