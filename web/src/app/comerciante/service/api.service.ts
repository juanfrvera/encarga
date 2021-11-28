import { environment } from "src/environments/environment";

export class ApiService {
    private url: string = environment.apiUrl;

    public get Url() {
        return this.url;
    }
}