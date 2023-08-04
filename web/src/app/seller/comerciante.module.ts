import { NgModule } from "@angular/core";
import { provider as authInterceptorProvider } from './interceptor/auth.interceptor';
import { AdminComponent } from "./page/admin.component";
import { DashboardComponent } from "./page/dashboard/dashboard.component";
import { ItemComponent } from "./page/item/item.component";
import { CrudComponent } from "./component/crud/crud.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoryComponent } from "./page/categories/categories.component";
import { ModalComponent } from "./component/modal/modal.component";
import { SharedModule } from "../shared/shared.module";
import { ComercianteRoutingModule } from "./comerciante.routing.module";
import { ApiService } from "./service/api.service";
import { LoginComponent } from "./page/login/login.component";
import { AuthService } from "./service/auth.service";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "./guard/auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { ItemModule } from "./feature/item/item.module";
import { CategoryModule } from "./feature/category/category.module";
import { ModalCrudComponent } from "./component/modal-crud/modal-crud.component";
import { LoadingComponent } from "./component/loading/loading.component";
import { ConfiguracionComponent } from "./page/configuracion/configuracion.component";
import { ItemApiService } from "./service/item.api.service";
import { CategoryApiService } from "./service/category.api.service";
import { ShopService } from "./service/shop.service";
import { ShopModule } from "./feature/shop/shop.module";

@NgModule({
    imports: [
        ComercianteRoutingModule,
        CommonModule,
        FormsModule,

        // Its imported here to override other interceptors and inject the interceptors of this module
        HttpClientModule,
        NgSelectModule,
        // App
        SharedModule,
        // Feature
        CategoryModule,
        ItemModule,
        ShopModule,
    ],
    declarations: [
        // Page
        AdminComponent,
        CategoryComponent,
        ConfiguracionComponent,
        DashboardComponent,
        ItemComponent,
        LoginComponent,
        // Component
        CrudComponent,
        LoadingComponent,
        ModalComponent,
        ModalCrudComponent
    ],
    providers: [
        // Service
        ApiService,
        AuthService,
        ItemApiService,
        CategoryApiService,
        ShopService,
        // Interceptor
        authInterceptorProvider,
        // Guard
        AuthGuard,
    ],
})
export class ComercianteModule { }