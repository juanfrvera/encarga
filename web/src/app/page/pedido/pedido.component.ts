import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offcanvas } from 'bootstrap';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Logic } from 'src/app/data/logic';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit, AfterViewInit, OnDestroy {
  // Contenedor donde se pondrá el offcanvas
  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('offcanvas', { static: true }) offcanvasElement: ElementRef;

  // Utilizado para desuscribirse a observables cuando el componente es destruido
  private destroy = new Subject<void>();
  private offcanvas: Offcanvas;

  constructor(private pedido: PedidoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribirse al parametro de urlComercio
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get(Logic.keyUrlComercio)),
      takeUntil(this.destroy)
    )
      // E informar al servicio de pedido cuando este parametro cambia
      .subscribe(urlComercio => this.pedido.UrlComercio = urlComercio);
  }

  ngAfterViewInit(): void {
    this.offcanvas = new Offcanvas(this.offcanvasElement.nativeElement);
  }

  ngOnDestroy(): void {
    // Ocultarlo para que no haya problemas con el scroll
    this.offcanvas.hide();

    // Usar notificación de destroy para desuscribirse de suscripciones activas
    this.destroy.next();
    this.destroy.complete();
    // Poner la url en null
    this.pedido.UrlComercio = null;
  }

  public abrirMenu() {
    this.offcanvas.show(this.container.nativeElement);
  }

}
