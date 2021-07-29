import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

export class ApiService<Dto, ListDto> {

  private readonly url: string = 'https://encargarpedido.herokuapp.com/';
  private readonly route: string;

  constructor(private http: HttpClient, route: string) {
    this.route = route;
  }

  public create(data: Omit<Dto, 'id'>) {
    return this.http.post<ListDto>(this.url + this.route, data)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public getAll() {
    return this.http.get<ListDto[]>(this.url + this.route);
  }
  public getById(id: string) {
    return this.http.get<Dto>(this.url + this.route + id);
  }
  public updateById(id: string, data: Omit<Dto, 'id'>) {
    return this.http.patch<ListDto>(this.url + this.route + id, data)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public deleteById(id: string) {
    return this.http.delete<ListDto>(this.url + this.route + id)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public getWithFilter(filter: any) {
    return this.http.post<ListDto[]>(this.url + this.route + 'filter', filter);
  }
}
