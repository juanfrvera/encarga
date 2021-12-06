import { Module } from '@nestjs/common';
import { ComercioService } from './comercio.service';
import { ComerciosController } from './comercio.controller';
import { ComercioTypeOrmModule } from 'src/typeorm/comercio/comercio.typeorm.module';
import { BaseModule } from 'src/base/base.module';
import { ComercioCategoriaModule } from '../comercio-categoria/comercio-categoria.module';

@Module({
  imports: [
    ComercioTypeOrmModule,
    BaseModule,
    ComercioCategoriaModule
  ],
  controllers: [ComerciosController],
  providers: [ComercioService],
  exports: [ComercioService]
})
export class ComercioModule { }
