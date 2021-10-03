export class ApiService<Dto, ListDto, Filter> {

  private static readonly url: string = 'https://encargarpedido.herokuapp.com/';

  public static get Url() {
    return ApiService.url;
  }

  private readonly route: string;

  public get Route() {
    return this.route;
  }

  constructor(route: string) {
    this.route = route;
  }
}
