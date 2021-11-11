import { Module } from '@nestjs/common';
import { UsuarioComercioService } from './usuario-comercio.service';
import { UsuarioComercioController } from './usuario-comercio.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [UsuarioComercioController],
  providers: [UsuarioComercioService],
  exports: [UsuarioComercioService]
})
export class UsuarioComercioModule { }
