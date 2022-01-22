import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { UsuarioComercioModule } from 'src/comerciante/usuario-comercio/usuario-comercio.module';
import { CategoriaTypeOrmModule } from 'src/typeorm/feature/categoria/categoria.typeorm.module';

@Module({
  imports: [
    UsuarioComercioModule,
    CategoriaTypeOrmModule,
  ],
  providers: [CategoriaService],
  exports: [CategoriaService]
})
export class CategoriaModule { }
