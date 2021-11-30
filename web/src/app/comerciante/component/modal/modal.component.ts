import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modal', { static: true }) element: ElementRef;
  private modal: Modal;

  public get Element() {
    return this.element;
  }

  constructor() { }
  ngAfterViewInit(): void {
    this.modal = new Modal(this.element.nativeElement);
  }
  ngOnDestroy(): void {
    this.close();
  }

  /** Abre el modal */
  public open() {
    this.modal.show();
  }

  /** Cierra el modal */
  public close() {
    this.modal.hide();
  }

}
