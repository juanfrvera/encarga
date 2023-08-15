import { Component, ViewChild } from "@angular/core";
import { FormularioComponent } from "src/app/shared/component/formulario/formulario.component";
import { SwalService } from "../../service/swal.service";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
    @ViewChild(FormularioComponent) formulario: FormularioComponent;

    public view = { disableSubmit: true, name: "", phone: "", url: "", saving: false };

    constructor(
        private readonly swalService: SwalService

    ) { }

    public onNameKeyUp() {
        this.checkSubmitDisable();
    }

    public onPhoneKeyUp() {
        this.checkSubmitDisable();
    }

    public onUrlKeyUp() {
        this.checkSubmitDisable();
    }

    public submitClicked() {
        if (this.formulario.isValid()) {
            this.view.saving = true;

            
        }
        else {
            this.formulario.showFeedback();
        }
    }

    private checkSubmitDisable() {
        this.view.disableSubmit = this.view.name == null || this.view.name.length <= 0 || this.view.phone == null || this.view.phone.length <= 0 || this.view.url == null || this.view.url.length <= 0
    }
}