import { Component, OnInit } from '@angular/core';
import { PagoService } from 'src/app/service/pago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  PUBLIC_KEY = "TEST-25ee66ce-0e4f-4299-856d-8814c9e297d6";

  constructor(private pagoService: PagoService) { }

  ngOnInit(): void {
  }


  pagar() {

    this.pagoService.pagar()
    
  }

}
