import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderService } from "../service/order.service";

@Injectable()
export class shopPathInterceptor implements HttpInterceptor {
    public static readonly HeaderName = "shop_path";

    constructor(private orderService: OrderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req = request;

        const url = this.orderService.ShopPath;
        if (url) {
            const cloned = request.clone({
                headers: request.headers.set(shopPathInterceptor.HeaderName, url)
            });

            req = cloned;
        }

        return next.handle(req);
    }
}

export const provider =
{
    provide: HTTP_INTERCEPTORS,
    useClass: shopPathInterceptor,
    multi: true
};