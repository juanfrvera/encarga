import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './page/detalle/detalle.component';
import { HomeComponent } from './page/home/home.component';
import { ClientComponent } from './page/client.component';

export const routeData = {
    shopPathParameter: 'shopPath'
};

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'detalle', component: DetalleComponent }
        ]
    },
    {
        path: `:${routeData.shopPathParameter}`,
        component: ClientComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'detalle', component: DetalleComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
