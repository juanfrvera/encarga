import { Controller, Post } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Controller('pago')
export class PagoController {
    private readonly accessToken = 'TEST-6988923134694818-112720-5589f13fe620bcf7a86180b79cc57d9f-448046528';
    /** Url a la que se redireccionará al usuario tras un pago exitoso */
    //private readonly urlPagado = 'https://encarga.shop/pagado';
    private readonly urlPagado = 'http://localhost:4200/admin/pagado';

    constructor() {
        mercadopago.configure({
            access_token: this.accessToken
        });
    }

    @Post()
    async nuevoPago() {
        // Crea un objeto de preferencia
        let preference = {
            items: [
                {
                    title: 'Mi producto',
                    unit_price: 1,
                    quantity: 1,
                }
            ],
            back_urls: {
                success: this.urlPagado
            }
        };

        const checkout = await mercadopago.preferences.create(preference);

        return { url: checkout.body.init_point };
    }
}
