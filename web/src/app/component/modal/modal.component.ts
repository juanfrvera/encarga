import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modal', { static: true }) element: ElementRef;
  private modal: Modal;

  public get Element() {
    return this.element;
  }

  constructor() { }
  ngAfterViewInit(): void {
    this.modal = new Modal(this.element.nativeElement);
  }

  /** Abre el modal */
  public abrir() {
    this.modal.show();
  }

  /** Cierra el modal */
  public cerrar() {
    this.modal.hide();
  }

}
