import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MockService } from "../service/mock.service";
import { UrlComercioInterceptor } from "./url-comercio.interceptor";

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    constructor(private readonly mockService: MockService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Si ya hay url de comercio, no usar mock
        if (req.headers) {
            if (req.headers.has(UrlComercioInterceptor.HeaderName)) {
                return next.handle(req);
            }
        }

        if (req.method === "GET") {
            if (req.url.endsWith('cliente/categoria/')) {
                return of(new HttpResponse(
                    { status: 200, body: this.mockService.getCategoriaList() }));
            }

            if (req.url.endsWith('comercio/defaultCategoriaId')) {
                return of(new HttpResponse(
                    { status: 200, body: this.mockService.getComercioDefaultCategoriaId() }));
            }

            if (new RegExp('cliente/item/').test(req.url)) {
                const categoriaId = req.params.get('categoriaId')!;

                return of(new HttpResponse(
                    { status: 200, body: this.mockService.getItemListByCategoriaId(categoriaId) }));
            }
        }

        if (req.method === "POST") {
            if (req.url.endsWith('/categoria/idList')) {
                return of(new HttpResponse(
                    { status: 200, body: this.mockService.getCategoriaListByIdList(req.body) }));
            }
            else if (req.url.endsWith('/item/filter')) {
                return of(new HttpResponse({ status: 200, body: this.mockService.getItemListByIdList(req.body) }));
            }
        }


        return next.handle(req);
    }

}

export const provider =
{
    provide: HTTP_INTERCEPTORS,
    useClass: MockInterceptor,
    multi: true
};