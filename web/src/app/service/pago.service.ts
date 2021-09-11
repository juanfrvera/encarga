import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences';
import InformacionPago from '../data/pago/info-pago';
import { ApiBaseService } from './instance/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService extends ApiBaseService {
  private readonly ruta = 'pagos/';

  constructor(private readonly http: HttpClient) {
    super();
  }

  pagar() {
    return this.http.post<InformacionPago>(PagoService.url + this.ruta, {});
  }
}
