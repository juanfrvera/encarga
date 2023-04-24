import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiService {
    private readonly url: string = environment.apiUrl + 'comerciante/';

    public get Url() {
        return this.url;
    }
}