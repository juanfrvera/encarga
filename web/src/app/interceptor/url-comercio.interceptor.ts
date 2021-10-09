import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PedidoService } from "../service/pedido.service";

@Injectable()
export class UrlComercioInterceptor implements HttpInterceptor {
    constructor(private pedidoService: PedidoService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req = request;

        const url = this.pedidoService.UrlComercio;
        if (url) {
            const cloned = request.clone({
                headers: request.headers.set("UrlComercio", url)
            });

            req = cloned;
        }

        return next.handle(req);
    }
}