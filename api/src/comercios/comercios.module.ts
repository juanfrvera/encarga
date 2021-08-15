import { Module } from '@nestjs/common';
import { ComerciosService } from './comercios.service';
import { ComerciosController } from './comercios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comercio } from './entities/comercio.entity';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comercio]), CategoriasModule],
  controllers: [ComerciosController],
  providers: [ComerciosService],
  exports: [ComerciosService]
})
export class ComerciosModule { }
