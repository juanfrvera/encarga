import { Module } from '@nestjs/common';
import { ComerciosService } from './comercio.service';
import { ComerciosController } from './comercio.controller';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { ComercioTypeOrmModule } from 'src/typeorm/comercio/comercio.typeorm.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    BaseModule,
    CategoriaModule,
    ComercioTypeOrmModule
  ],
  controllers: [ComerciosController],
  providers: [ComerciosService],
  exports: [ComerciosService]
})
export class ComercioModule { }
