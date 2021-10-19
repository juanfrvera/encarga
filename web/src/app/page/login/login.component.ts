import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioComponent } from 'src/app/component/formulario/formulario.component';
import { AuthService } from 'src/app/service/auth.service';

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

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  public ingresar() {
    if (this.formulario.esValido()) {
      this.ingresando = true;

      this.auth.login(this.Mail, this.Password)
        .subscribe(() => {
          this.router.navigateByUrl('admin');
          this.ingresando = false;
        },
          // Error  
          () => {
            this.ingresando = false;
          });
    }
    else {
      this.formulario.mostrarFeedback();
    }
  }

}
