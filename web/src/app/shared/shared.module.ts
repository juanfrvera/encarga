import { NgModule } from "@angular/core";
import { FormularioComponent } from "./component/formulario/formulario.component";

@NgModule({
    declarations: [
        // Component
        FormularioComponent,
    ],
    exports: [
        FormularioComponent
    ]
})
export class SharedModule { }