import { Component, OnInit, ViewChild } from '@angular/core';
import { FormularioComponent } from 'src/app/component/formulario/formulario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(FormularioComponent) formulario: FormularioComponent;

  private mail: string;
  private password: string;

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

  constructor() { }

  ngOnInit(): void {
  }

  public ingresar() {
    if (this.formulario.esValido()) {
      console.log("ingresar");
    }
    else {
      console.log("invalido");
      this.formulario.mostrarFeedback();
    }
  }

}
