import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthData } from '../data/auth/auth-data.dto';
import * as moment from 'moment';
import ms from 'ms';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly tokenExpirationKey = 'token_expiration';


  constructor(
    private readonly httpClient: HttpClient,
    private readonly apiService: ApiService
  ) { }

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

  public login(email: string, password: string) {
    return this.httpClient.post<AuthData>(`${this.apiService.Url}/login`, { email, password }).pipe(
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
