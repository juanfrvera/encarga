import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MockService } from "../service/mock.service";
import { AuthInterceptor } from "./auth.interceptor";
import { UrlComercioInterceptor } from "./url-comercio.interceptor";

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    constructor(private readonly mockService: MockService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Si ya hay token o url de comercio, no usar mock
        if (req.headers) {
            if (req.headers.has(AuthInterceptor.HeaderName)) {
                return next.handle(req);
            }

            if (req.headers.has(UrlComercioInterceptor.HeaderName)) {
                return next.handle(req);
            }
        }

        if (req.method === "POST") {
            if (req.url.endsWith('/categorias/filter')) {
                return of(new HttpResponse({ status: 200, body: this.mockService.getWithFilter(req.body) }));
            }
        }


        return next.handle(req);
    }

}

export const mockInterceptorProvider =
{
    provide: HTTP_INTERCEPTORS,
    useClass: MockInterceptor,
    multi: true
};