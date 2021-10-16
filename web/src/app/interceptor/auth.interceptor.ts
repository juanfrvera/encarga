import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public static readonly HeaderName = "Authorization";


  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;

    if (this.auth.isLogged()) {
      // Token no es null ya que el usuario está logeado
      const token = this.auth.getToken()!;

      // Insertar la header del bearer token
      const cloned = request.clone({
        headers: request.headers.set(AuthInterceptor.HeaderName, "Bearer " + token)
      });

      req = cloned;
    }

    return next.handle(req).pipe(
      tap({
        error: err => {
          // Si hay un error de falta de autorización, redirigir al login
          if (err instanceof HttpErrorResponse && err.status === 401) {
            // Solo redireccionar cuando se está en la parte de administrador
            if (this.router.url.includes('/admin')) {
              this.router.navigateByUrl('login');
            }
          }
        }
      })
    );
  }
}
