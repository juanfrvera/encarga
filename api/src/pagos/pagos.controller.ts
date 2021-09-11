import { Controller, Post } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';

@Controller('pagos')
export class PagosController {
    private readonly accessToken = 'APP_USR-5099100232559916-083017-df57235bf496bb20ed523cafdc347097-814179707';
    /** Url a la que se redireccionará al usuario tras un pago exitoso */
    //private readonly urlPagado = 'https://encarga.shop/pagado';
    private readonly urlPagado = 'http://localhost:4200/pagado';

    constructor() {
        mercadopago.configure({
            access_token: this.accessToken
        });
    }

    @Post()
    async nuevoPago() {
        // Crea un objeto de preferencia
        const preference: CreatePreferencePayload = {
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
