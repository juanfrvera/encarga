import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioComponent } from 'src/app/shared/component/formulario/formulario.component';
import { AuthService } from 'src/app/seller/service/auth.service';
import { SwalService } from 'src/app/seller/service/swal.service';
import { LocaleService } from 'src/app/shared/service/locale.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(FormularioComponent) formulario: FormularioComponent;

  private ingresando: boolean;
  private mail: string;
  private password: string;

  public get Ingresando() {
    return this.ingresando;
  }
  public get Mail() {
    return this.mail;
  }
  public set Mail(value: string) {
    this.mail = value;
  }
  public get Password() {
    return this.password;
  }
  public set Password(value: string) {
    this.password = value;
  }

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly swalService: SwalService,
    private readonly localeService: LocaleService,
    ) { }

  ngOnInit(): void {
  }

  public ingresar() {
    if (this.formulario.isValid()) {
      this.ingresando = true;

      this.auth.login(this.Mail, this.Password).subscribe(
        () => {
          this.ingresando = false;
          this.router.navigateByUrl('admin/productos');
        },
        // Error  
        (res: HttpErrorResponse) => {
          const text = this.localeService.getUserFriendlyError(res.error);
          this.swalService.fire({
            icon: 'error',
            iconColor: SwalService.errorColor,
            title: 'Error',
            text,
            confirmButtonText: 'Aceptar',
          });

          this.ingresando = false;
        });
    }
    else {
      this.formulario.showFeedback();
    }
  }

}
