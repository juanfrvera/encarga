import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ItemModule } from './item/item.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ItemCategoriaModule } from './item-categoria/item-categoria.module';
import { ComercioModule } from './comercio/comercio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioComercioModule } from './usuario-comercio/usuario-comercio.module';
import { AuthModule } from './auth/auth.module';
import { PagoController } from './pago/pago.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ItemModule,
    CategoriaModule,
    ItemCategoriaModule,
    ComercioModule,
    UsuarioModule,
    UsuarioComercioModule,
    AuthModule,
    PagoController
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
