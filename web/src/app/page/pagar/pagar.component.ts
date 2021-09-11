import { Component, OnInit } from '@angular/core';
import { get } from 'scriptjs';
import { PagoService } from 'src/app/service/pago.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {

  constructor(private readonly pago: PagoService) { }

  ngOnInit(): void {
    get('https://sdk.mercadopago.com/js/v2', () => {
      // Se carga esta librería para aumentar la seguridad
      console.log("Mercadopago iniciado");
    });
  }

  public pagar() {
    console.log("pagar");
    this.pago.pagar().subscribe(respuesta => {
      const url = respuesta.url;
      window.location.href = url;
      console.log(respuesta);
    });
  }

}
