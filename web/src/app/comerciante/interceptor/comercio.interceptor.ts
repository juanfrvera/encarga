import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ComercioService } from "../service/comercio.service";

@Injectable()
export class ComercioInterceptor implements HttpInterceptor {
    public static readonly HeaderName = "comercio_id";

    constructor(private comercioService: ComercioService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req = request;

        const comercioId = this.comercioService.Id;

        if (comercioId) {
            const cloned = request.clone({
                headers: request.headers.set(ComercioInterceptor.HeaderName, comercioId)
            });

            req = cloned;
        }

        return next.handle(req);
    }
}

export const provider =
{
    provide: HTTP_INTERCEPTORS,
    useClass: ComercioInterceptor,
    multi: true
};