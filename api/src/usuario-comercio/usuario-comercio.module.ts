import { Module } from '@nestjs/common';
import { UsuarioComercioService } from './usuario-comercio.service';
import { UsuarioComercioController } from './usuario-comercio.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [UsuarioComercioController],
  providers: [UsuarioComercioService],
  exports: [UsuarioComercioService]
})
export class UsuarioComercioModule { }
