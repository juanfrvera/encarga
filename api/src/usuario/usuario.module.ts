import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioTypeOrmModule } from 'src/typeorm/usuario/usuario.typeorm.module';

@Module({
  imports: [
    UsuarioTypeOrmModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule { }
