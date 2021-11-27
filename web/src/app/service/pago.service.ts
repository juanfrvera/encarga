import { Injectable } from '@angular/core';
import { PagoController } from '../../../../api/src/pago/pago.controller'

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private pagoController: PagoController) { }

  pagar() {
    this.pagoController.nuevoPago()
  }
}
