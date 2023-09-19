import { NgModule } from "@angular/core";
import { FormularioComponent } from "./component/formulario/formulario.component";
import { FormsModule } from "@angular/forms";
import { LocaleService } from "./service/locale.service";

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
    ],
    providers: [
        // Service
        LocaleService
    ]
})
export class SharedModule { }