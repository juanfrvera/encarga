import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

export class ApiService<Dto, ListDto, Filter> {

  private static readonly url: string = 'https://encargarpedido.herokuapp.com/';
  private readonly route: string;

  public static get Url() {
    return ApiService.url;
  }

  constructor(private http: HttpClient, route: string) {
    this.route = route;
  }

  public create(data: Omit<Dto, 'id'>) {
    return this.http.post<Dto>(ApiService.url + this.route, data)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public getAll() {
    return this.http.get<ListDto[]>(ApiService.url + this.route);
  }
  public getById(id: string) {
    return this.http.get<Dto>(ApiService.url + this.route + id);
  }

  /**
   * 
   * @param id 
   * @param data 
   * @returns Observable que puede ser subscribido varias veces sin problemas (sin volver a ejecutarse el update)
   */
  public updateById(id: string, data: Omit<Dto, 'id'>) {
    return this.http.patch<Dto>(ApiService.url + this.route + id, data)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public deleteById(id: string) {
    return this.http.delete(ApiService.url + this.route + id)
      // Esto se hace ya que nos suscribimos más de una vez
      // Más información: https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
      .pipe(
        shareReplay()
      );
  }
  public getWithFilter(filter: Filter) {
    return this.http.post<ListDto[]>(ApiService.url + this.route + 'filter', filter);
  }
}
