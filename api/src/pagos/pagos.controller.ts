import { Controller, Post } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Controller('pagos')
export class PagosController {
    private readonly accessToken = 'TEST-5904382103750519-082621-b620ee60c2854e004f07848cedd97f08-206067513';

    constructor() {
        mercadopago.configure({
            access_token: this.accessToken
        });
    }

    @Post()
    nuevoPago() {
        // Crea un objeto de preferencia
        const preference = {
            items: [
                {
                    title: 'Mi producto',
                    unit_price: 100,
                    quantity: 1,
                }
            ]
        };

        return mercadopago.preferences.create(preference);
    }
}
