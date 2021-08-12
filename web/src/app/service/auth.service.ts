import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthData } from '../data/auth/auth-data.dto';
import { ApiService } from './instance/api.service';
import * as moment from 'moment';
import ms from 'ms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly tokenExpirationKey = 'token_expiration';

  private readonly route = 'auth/';

  constructor(private http: HttpClient) { }

  public getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  /** Si el usuario administrador actual está autenticado */
  public isLogged() {
    const token = this.getToken();

    if (token) {
      const expirationJson = localStorage.getItem(this.tokenExpirationKey);
      if (expirationJson) {
        const expirationDate = JSON.parse(expirationJson);

        // Si la fecha actual es antes de la fecha de expiración
        return moment().isBefore(expirationDate);
      }
    }

    return false;
  }

  public login(mail: string, password: string) {
    return this.http.post<AuthData>(ApiService.Url + this.route + 'login', { mail, password }).pipe(
      tap(data => {
        // Usando la misma librería que usa el servidor para transformar el formato a milisegundos
        const milliseconds = ms(data.expiresIn);
        const expirationDate = moment().add(milliseconds, 'milliseconds');

        localStorage.setItem(this.tokenKey, data.token);

        // Guardamos también la fecha de expiración para en un futuro detectar
        // automáticamente si el token está expirado
        localStorage.setItem(this.tokenExpirationKey, JSON.stringify(expirationDate));
      })
    );
  }
}
