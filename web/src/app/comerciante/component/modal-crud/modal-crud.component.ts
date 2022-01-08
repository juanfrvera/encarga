import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";

@Component({
    selector: 'app-modal-crud',
    templateUrl: './modal-crud.component.html'
})
export class ModalCrudComponent {
    @Input() loading: boolean;
    @Input() saving: boolean;

    @Output() onClose = new EventEmitter();
    @Output() onSave = new EventEmitter();

    @ViewChild(ModalComponent) modal: ModalComponent;

    public open() {
        this.modal.open();
    }

    public close() {
        this.modal.close();
    }

    public clickClose() {
        this.onClose.emit();
    }

    public clickSave() {
        if (!this.saving) {
            this.onSave.emit();
        }
    }
}