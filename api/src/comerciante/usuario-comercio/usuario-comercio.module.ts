import { Module } from '@nestjs/common';
import { UsuarioComercioService } from './usuario-comercio.service';
import { UsuarioComercioController } from './usuario-comercio.controller';
import { UsuarioComercioTypeOrmModule } from 'src/typeorm/usuario-comercio/usuario-comercio.typeorm.module';

@Module({
  imports: [
    UsuarioComercioTypeOrmModule
  ],
  controllers: [UsuarioComercioController],
  providers: [UsuarioComercioService],
  exports: [UsuarioComercioService]
})
export class UsuarioComercioModule { }
