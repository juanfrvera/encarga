import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ClienteRoutingModule } from "./cliente.routing.module";
import { DetalleComponent } from "./page/detalle/detalle.component";
import { HomeComponent } from "./page/home/home.component";
import { PedidoComponent } from "./page/pedido.component";
import { ApiService } from "./service/api.service";
import { CategoriaService } from "./service/categoria.service";
import { ItemService } from "./service/item.service";
import { PedidoService } from "./service/pedido.service";
import { provider as mockInterceptorProvider } from "./interceptor/mock.interceptor";
import { provider as urlComercioInterceptorProvider } from "./interceptor/url-comercio.interceptor";

@NgModule({
    imports: [
        CommonModule,
        ClienteRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        // Page
        PedidoComponent,
        HomeComponent,
        DetalleComponent,
    ],
    providers: [
        ApiService,
        CategoriaService,
        ItemService,
        PedidoService,
        // Interceptor
        mockInterceptorProvider,
        urlComercioInterceptorProvider
    ]
})
export class ClienteModule { }