import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ClientRoutingModule } from "./client.routing.module";
import { DetailComponent } from "./page/detail/detail.component";
import { CatalogComponent } from "./page/catalog/catalog.component";
import { ClientComponent } from "./page/client.component";
import { ApiService } from "./service/api.service";
import { CategoryService } from "./service/category.service";
import { ItemService } from "./service/item.service";
import { OrderService } from "./service/order.service";
import { provider as shopPathInterceptorProvider } from "./interceptor/shop-path.interceptor";
import { HttpClientModule } from "@angular/common/http";
import { ShopService } from "./service/shop.service";
import { NotFoundComponent } from "./page/not-found/not-found.component";

@NgModule({
    imports: [
        ClientRoutingModule,
        CommonModule,

        // Its imported here to override other interceptors and inject the interceptors of this module
        HttpClientModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        // Page
        ClientComponent,
        CatalogComponent,
        DetailComponent,
        NotFoundComponent
    ],
    providers: [
        ApiService,
        CategoryService,
        ItemService,
        OrderService,
        ShopService,
        // Interceptor (order is important)
        shopPathInterceptorProvider,
    ]
})
export class ClientModule { }