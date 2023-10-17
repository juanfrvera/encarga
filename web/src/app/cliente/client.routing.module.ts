import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './page/detail/detail.component';
import { CatalogComponent } from './page/catalog/catalog.component';
import { ClientComponent } from './page/client.component';

export const routeData = {
    shopPathParameter: 'shopPath'
};

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            { path: '', component: CatalogComponent },
            { path: 'detalle', component: DetailComponent }
        ]
    },
    {
        path: `:${routeData.shopPathParameter}`,
        component: ClientComponent,
        children: [
            { path: '', component: CatalogComponent },
            { path: 'detalle', component: DetailComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
