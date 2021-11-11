import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioTypeOrmModel } from './storage/usuario.typeorm.model';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioTypeOrmModel])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule { }
