import { NgModule } from "@angular/core";
import { FormularioComponent } from "./component/formulario/formulario.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        FormsModule
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