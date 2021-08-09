import { Module } from '@nestjs/common';
import { UsuarioComercioService } from './usuario-comercio.service';
import { UsuarioComercioController } from './usuario-comercio.controller';

@Module({
  controllers: [UsuarioComercioController],
  providers: [UsuarioComercioService]
})
export class UsuarioComercioModule {}
