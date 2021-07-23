import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {
  @ViewChild('offcanvas', { static: true }) offcanvasElement: ElementRef;
  private offcanvas: Offcanvas;

  constructor() { }
  ngAfterViewInit(): void {
    this.offcanvas = new Offcanvas(this.offcanvasElement.nativeElement);
  }

  public abrirMenu() {
    this.offcanvas.show(document.body);
  }

}
