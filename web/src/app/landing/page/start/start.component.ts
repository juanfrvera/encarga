import { Component } from "@angular/core";

@Component({
    templateUrl: "./start.component.html",
    styleUrls: ["./start.component.scss"]
})
export class StartComponent {
    public view = { disableSubmit: true, phone: "", name: "" };

    public onPhoneKeyUp() {
        this.checkSubmitDisable();
    }
    public onNameKeyUp() {
        this.checkSubmitDisable();
    }

    private checkSubmitDisable() {
        this.view.disableSubmit = this.view.phone == null || this.view.phone.length <= 0 || this.view.name == null || this.view.name.length <= 0
    }
}