import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormularioComponent } from "src/app/shared/component/formulario/formulario.component";
import { AuthService } from "../../service/auth.service";
import { SwalService } from "../../service/swal.service";
import { HttpErrorResponse } from "@angular/common/http";
import { LocaleService } from "src/app/shared/service/locale.service";

@Component({
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
    @ViewChild(FormularioComponent) formulario: FormularioComponent;

    public view = { disableSubmit: true, email: "", password: "", registering: false };

    constructor(
        private router: Router,
        private readonly auth: AuthService,
        private readonly swalService: SwalService,
        private readonly localeService: LocaleService

    ) { }
    public submitClicked() {
        if (this.formulario.isValid()) {
            this.view.registering = true;

            this.auth.register(this.view.email, this.view.password).subscribe(
                () => {
                    this.router.navigateByUrl('admin/config');
                },
                // Error  
                (res: HttpErrorResponse) => {
                    const text = this.localeService.getUserFriendlyError(res.error);
                    this.swalService.fire({
                        icon: 'error',
                        title: 'Error',
                        text,
                        keydownListenerCapture: true,
                        confirmButtonText: 'Continuar'
                    });
                },
                () => {
                    this.view.registering = false;
                });
        }
        else {
            this.formulario.showFeedback();
        }
    }
}