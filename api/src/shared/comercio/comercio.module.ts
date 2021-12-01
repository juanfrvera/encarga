import { Module } from '@nestjs/common';
import { ComercioService } from './comercio.service';
import { ComerciosController } from './comercio.controller';
import { CategoriaModule } from 'src/shared/categoria/categoria.module';
import { ComercioTypeOrmModule } from 'src/typeorm/comercio/comercio.typeorm.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    BaseModule,
    CategoriaModule,
    ComercioTypeOrmModule
  ],
  controllers: [ComerciosController],
  providers: [ComercioService],
  exports: [ComercioService]
})
export class ComercioModule { }
