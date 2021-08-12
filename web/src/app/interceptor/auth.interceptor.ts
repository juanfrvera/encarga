import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isLogged()) {
      // Token no es null ya que el usuario está logeado
      const token = this.auth.getToken()!;

      // Insertar la header del bearer token
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
