import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './shared/item/item.module';
import { ItemCategoriaModule } from './shared/item-categoria/item-categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ComercianteModule } from './comerciante/comerciante.module';
import { SharedModule } from './shared/shared.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ClienteModule,
    ComercianteModule,
    SharedModule,
    ItemModule,
    ItemCategoriaModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
