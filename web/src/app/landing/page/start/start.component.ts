import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SellerFacade } from "src/app/shared/comercio/comercio.facade";

@Component({
    templateUrl: "./start.component.html",
    styleUrls: ["./start.component.scss"]
})
export class StartComponent {
    public view = { disableSubmit: true, phone: "", name: "" };

    constructor(
        private router: Router,
        private comercioFacade: SellerFacade
    ) { }

    public onPhoneKeyUp() {
        this.checkSubmitDisable();
    }

    public onNameKeyUp() {
        this.checkSubmitDisable();
    }

    public submitClicked() {
        this.comercioFacade.createTemporalSeller({ phone: this.view.phone, name: this.view.name });

        this.router.navigate(['admin']);
    }

    private checkSubmitDisable() {
        this.view.disableSubmit = this.view.phone == null || this.view.phone.length <= 0 || this.view.name == null || this.view.name.length <= 0
    }
}