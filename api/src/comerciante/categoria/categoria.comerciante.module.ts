import { Module } from "@nestjs/common";
import { CategoriaModule } from "src/shared/categoria/categoria.module";
import { CategoriaComercianteController } from "./categoria.comerciante.controller";
import { CategoriaComercianteService } from "./categoria.comerciante.service";

@Module({
    imports: [CategoriaModule],
    controllers: [CategoriaComercianteController],
    providers: [CategoriaComercianteService]
})
export class CategoriaComercianteModule { }