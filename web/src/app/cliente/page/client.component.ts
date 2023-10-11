import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { OrderService } from 'src/app/cliente/service/order.service';
import { routeData } from '../client.routing.module';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  // Utilizado para desuscribirse a observables cuando el componente es destruido
  private destroy = new Subject<void>();
  
  constructor (
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribirse al parametro de urlComercio
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get(routeData.shopPathParameter)),
      takeUntil(this.destroy)
    )
      // E informar al servicio de pedido cuando este parametro cambia
      .subscribe(shopPath => this.orderService.ShopPath = shopPath);
  }


  ngOnDestroy(): void {
    // Usar notificación de destroy para desuscribirse de suscripciones activas
    this.destroy.next();
    this.destroy.complete();
    // Poner la url en null
    this.orderService.ShopPath = null;
  }

}
