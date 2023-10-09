import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiService {
    private readonly url = environment.apiUrl + '/client';

    public get Url() {
        return this.url;
    }
}