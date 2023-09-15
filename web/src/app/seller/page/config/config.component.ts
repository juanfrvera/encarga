import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormularioComponent } from "src/app/shared/component/formulario/formulario.component";
import { SwalService } from "../../service/swal.service";
import { Util } from 'src/app/util';
import { ShopFacade } from "../../feature/shop/shop.facade";
import { IntlTelInputComponent } from "intl-tel-input-ng";
import { ShopLite } from "../../data/shop/shop-lite.data";
import { Shop } from "../../data/shop/shop.data";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']

})

export class ConfigComponent implements OnInit, AfterViewInit {
    @ViewChild(FormularioComponent) formulario: FormularioComponent;
    @ViewChild(IntlTelInputComponent) phoneInput: IntlTelInputComponent;

    public view: {
        submitted: boolean,
        saving: boolean,
        editing: boolean,
        originalShop?: ShopLite,
        currentShop?: Shop,
    } = {
            submitted: false,
            saving: false,
            editing: false,
            currentShop: {} as Shop
        }

    constructor(
        private readonly swalService: SwalService,
        private readonly shopFacade: ShopFacade
    ) { }


    ngOnInit(): void {
        const shopList = this.shopFacade.getList();
        if (shopList.length > 0) {
            this.view.originalShop = shopList[0];
            this.view.currentShop = { ...shopList[0] }
            this.view.editing = true;
        }

    }

    ngAfterViewInit(): void {
        // This sets the input with value from outside
        setTimeout(() => {
            if (this.view.currentShop) {
                this.phoneInput.intlTelInput.setNumber(this.view.currentShop.phone);
            }
        });
    }

    public submitClicked() {
        this.view.submitted = true;
        if (this.formulario.isValid()) {
            if (this.view.currentShop?.phone == null) {
                this.formulario.showFeedback();
            }
            else {
                this.view.saving = true;
                this.formulario.showFeedback();
                if (this.view.editing) {
                    // Editing
                    if (this.view.originalShop) {
                        const editedItem = Util.getObjectWithChangedFields(this.view.originalShop, this.view.currentShop);
                        this.shopFacade.update(this.view.originalShop._id, editedItem).then(() => {
                            this.swalService.fire({
                                icon: 'success',
                                title: 'Éxito',
                                text: 'Se ha actualizado exitosamente',
                                keydownListenerCapture: true,
                                confirmButtonText: 'Continuar'
                            })
                            this.view.submitted = false;
                            this.view.saving = false;

                        })
                            .catch((error) => {
                                this.view.submitted = false;
                                this.view.saving = false;

                                this.swalService.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Ocurrió un error inesperado',
                                    keydownListenerCapture: true,
                                    confirmButtonText: 'Continuar'
                                })
                            })
                    }
                }
                else {
                    // Creating
                    this.shopFacade.create(this.view.currentShop).then((data) => {
                        this.swalService.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Se ha creado exitosamente',
                            keydownListenerCapture: true,
                            confirmButtonText: 'Continuar'
                        })

                        this.view.editing = true;
                        this.view.submitted = false;
                        this.view.saving = false;

                        
                    })
                        .catch((error) => {
                            this.view.submitted = false;
                            this.view.saving = false;

                            this.swalService.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error inesperado',
                                keydownListenerCapture: true,
                                confirmButtonText: 'Continuar'
                            })
                        })


                }
            }
        }
        else {
            this.formulario.showFeedback();
        }
    }


    // When entering name, url automatically offers an option using name input
    public onNameInputChange() {
        if (this.view.currentShop) {
            this.view.currentShop.path = this.view.currentShop.name.toLowerCase().split(' ').join('-');
        }
    }

    // Avoid user to enter characters that dont match the regex
    public onUrlInputChange() {
        if (this.view.currentShop) {
            if (!RegExp("^[a-z0-9-]+$").test(this.view.currentShop.path)) {
                // Remove characters that don't match the pattern
                this.view.currentShop.path = this.view.currentShop.path.replace(RegExp("[^a-z0-9-]"), '');
            }
        }

    }


}


