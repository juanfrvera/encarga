import { environment } from "src/environments/environment";

export class ApiService {

  private static readonly url: string = environment.apiUrl;

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
