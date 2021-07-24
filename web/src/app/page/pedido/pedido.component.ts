import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements AfterViewInit, OnDestroy {
  // Contenedor donde se pondrá el offcanvas
  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('offcanvas', { static: true }) offcanvasElement: ElementRef;
  private offcanvas: Offcanvas;

  constructor() { }
  ngAfterViewInit(): void {
    this.offcanvas = new Offcanvas(this.offcanvasElement.nativeElement);
  }
  ngOnDestroy(): void {
    // Ocultarlo para que no haya problemas con el scroll
    this.offcanvas.hide();
  }

  public abrirMenu() {
    this.offcanvas.show(this.container.nativeElement);
  }

}
