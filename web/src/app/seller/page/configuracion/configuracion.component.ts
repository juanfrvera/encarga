import { Component } from "@angular/core";

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
})
export class ConfiguracionComponent {
    model: {
        phone?: string;
    } = {};

    public get Model() {
        return this.model;
    }
}