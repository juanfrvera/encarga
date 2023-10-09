import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ClienteRoutingModule } from "./cliente.routing.module";
import { DetalleComponent } from "./page/detalle/detalle.component";
import { HomeComponent } from "./page/home/home.component";
import { PedidoComponent } from "./page/pedido.component";
import { ApiService } from "./service/api.service";
import { CategoryService } from "./service/category.service";
import { ItemService } from "./service/item.service";
import { PedidoService } from "./service/pedido.service";
import { provider as urlComercioInterceptorProvider } from "./interceptor/url-comercio.interceptor";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        ClienteRoutingModule,
        CommonModule,

        // Its imported here to override other interceptors and inject the interceptors of this module
        HttpClientModule,
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
        CategoryService,
        ItemService,
        PedidoService,
        // Interceptor (order is important)
        urlComercioInterceptorProvider,
    ]
})
export class ClienteModule { }