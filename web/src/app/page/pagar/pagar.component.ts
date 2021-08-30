import { Component, OnInit } from '@angular/core';
import { get } from 'scriptjs';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    get('https://sdk.mercadopago.com/js/v2', () => {
      // Se carga esta librería para aumentar la seguridad
      console.log("Mercadopago iniciado");
    });
  }

}
