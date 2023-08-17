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

    public view = {submitted: false, name: "", phone: "", url: "", saving: false };

    constructor(
        private readonly swalService: SwalService

    ) { }

    public submitClicked() {
        this.view.submitted = true;
        if (this.formulario.isValid()) {
            if (this.view.phone == null) {
                this.formulario.showFeedback();
                }
                else {
                    console.log(this.view);
                    this.view.saving = true;
                    this.formulario.showFeedback();
                }
            }
        else {
            this.formulario.showFeedback();
        }
    }


    // When entering name, url automatically offers an option using name input
    public onNameInputChange() {
        const valueToShow = this.view.name.toLowerCase().split(' ').join('-');
        this.view.url = valueToShow;
    }

    // Avoid user to enter characters that dont match the regex
    public onUrlInputChange() {
        console.log(this.view.url)
        if (!RegExp("^[a-z0-9-]+$").test(this.view.url)) {
            // Remove characters that don't match the pattern
            this.view.url = this.view.url.replace(RegExp("[^a-z0-9-]"), '');
        }
    }

}


