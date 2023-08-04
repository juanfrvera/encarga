import { NgModule } from "@angular/core";
import { FormularioComponent } from "./component/formulario/formulario.component";

@NgModule({
    imports: [
    ],
    declarations: [
        // Component
        FormularioComponent
    ],
    exports: [
        FormularioComponent,
    ]
})
export class SharedModule { }