import { forwardRef, Module } from '@nestjs/common';
import { ComerciosService } from './comercio.service';
import { ComerciosController } from './comercio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { ComercioTypeOrmModel } from './storage/comercio.typeorm.model';

@Module({
  imports: [TypeOrmModule.forFeature([ComercioTypeOrmModel]), forwardRef(() => CategoriaModule)],
  controllers: [ComerciosController],
  providers: [ComerciosService],
  exports: [ComerciosService]
})
export class ComercioModule { }
