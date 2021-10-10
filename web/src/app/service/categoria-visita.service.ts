import { Injectable } from "@angular/core";
import { CategoriaService } from "./categoria.service";

/** Servicio de categorias utilizado por el actor Visita */
@Injectable({
    providedIn: 'root'
})
export class CategoriaVisitaService extends CategoriaService {
    getAll() {
        return this.getWithFilter({ vacias: false });
    }
}