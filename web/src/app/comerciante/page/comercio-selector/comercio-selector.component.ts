import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ComercioFacade } from "../../comercio/comercio.facade";
import { ComercioLightDto } from "../../comercio/model/comercio.light.dto";

@Component({
    selector: 'app-comercio-selector',
    templateUrl: './comercio-selector.component.html',
    styleUrls: ['./comercio-selector.component.scss']
})
export class ComercioSelectorComponent implements OnInit, OnDestroy {
    private list: Array<ComercioLightDto> | null;
    private listSubscription: Subscription;

    public get List() {
        return this.list;
    }

    constructor(
        private readonly router: Router,
        private readonly comercioFacade: ComercioFacade
    ) { }

    ngOnInit(): void {
        this.listSubscription = this.comercioFacade.getList$().subscribe(list => {
            this.list = list;

            if (list) {
                // There is only one comercio, select this
                if (list.length == 1) {
                    this.select(list[0]);
                }
            }
        });

        this.comercioFacade.loadList();
    }

    ngOnDestroy(): void {
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
    }

    private select(comercio: ComercioLightDto) {
        this.comercioFacade.setCurrent(comercio);

        this.router.navigateByUrl('admin');
    }
}