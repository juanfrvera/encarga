import { NgModule } from "@angular/core";
import { FormularioComponent } from "./component/formulario/formulario.component";
import { ComercioModule } from "./comercio/comercio.module";

@NgModule({
    imports: [
        ComercioModule
    ],
    declarations: [
        // Component
        FormularioComponent
    ],
    exports: [
        FormularioComponent,
        ComercioModule
    ]
})
export class SharedModule { }