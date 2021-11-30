import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './page/detalle/detalle.component';
import { HomeComponent } from './page/home/home.component';
import { PedidoComponent } from './page/pedido.component';

export const routeData = {
    comercioUrlParameter: 'urlComercio'
};

const routes: Routes = [
    {
        path: '',
        component: PedidoComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'detalle', component: DetalleComponent }
        ]
    },
    {
        path: ':urlComercio',
        component: PedidoComponent,
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
export class ClienteRoutingModule { }
