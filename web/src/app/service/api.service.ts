import { HttpClient } from '@angular/common/http';

export class ApiService<T> {

  private readonly url: string = 'https://encargarpedido.herokuapp.com/';
  private readonly route: string;

  constructor(private http: HttpClient, route: string) {
    this.route = route;
  }

  public create(data: T) {
    return this.http.post(this.url + this.route, data);
  }
  public getAll() {
    return this.http.get<T[]>(this.url + this.route);
  }
  public getById(id: string) {
    return this.http.get<T>(this.url + this.route + id);
  }
  public updateById(id: string, data: T) {
    return this.http.put<T>(this.url + this.route + id, data);
  }
  public deleteById(id: string) {
    return this.http.delete<T>(this.url + this.route + id);
  }
  public getWithFilter(filter: any) {
    return this.http.post<T[]>(this.url + this.route + 'filter', filter);
  }
}
