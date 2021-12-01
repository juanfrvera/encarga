import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ItemModule } from './item/item.module';
import { ItemCategoriaModule } from './item-categoria/item-categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioComercioModule } from './usuario-comercio/usuario-comercio.module';
import { AuthModule } from './auth/auth.module';
import { ComercianteModule } from './comerciante/comerciante.module';
import { SharedModule } from './shared/shared.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ClienteModule,
    ComercianteModule,
    SharedModule,
    ItemModule,
    ItemCategoriaModule,
    UsuarioModule,
    UsuarioComercioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
