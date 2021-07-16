import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

export class ApiService<T> {

  private readonly url: string = 'https://encargarpedido.herokuapp.com/';
  private readonly route: string;

  constructor(private http: HttpClient, route: string) {
    this.route = route;
  }

  public create(data: T) {
    return this.http.post<T>(this.url + this.route, data)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public getAll() {
    return this.http.get<T[]>(this.url + this.route);
  }
  public getById(id: string) {
    return this.http.get<T>(this.url + this.route + id);
  }
  public updateById(id: string, data: T) {
    return this.http.put<T>(this.url + this.route + id, data)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public deleteById(id: string) {
    return this.http.delete<T>(this.url + this.route + id)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public getWithFilter(filter: any) {
    return this.http.post<T[]>(this.url + this.route + 'filter', filter);
  }
}
