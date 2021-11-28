import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  @ViewChild('formulario') formulario: ElementRef<HTMLFormElement>;

  /** Clase que se agrega al formulario para mostrar feedback de validación */
  private claseParaValidarFormulario = 'was-validated';

  constructor() { }

  /** Devuelve verdadero si el formulario es válido */
  public esValido() {
    return this.formulario.nativeElement.checkValidity();
  }

  /** Muestra feedback sobre inputs faltantes y los que están bien */
  public mostrarFeedback() {
    // Agregar clase para indicar que el formulario fue validado y mostrar feedback
    this.formulario.nativeElement.classList.add(this.claseParaValidarFormulario);
  }

  /** Oculta el feedback mostrado */
  public ocultarFeedback() {
    this.formulario.nativeElement.classList.remove(this.claseParaValidarFormulario);
  }

}
