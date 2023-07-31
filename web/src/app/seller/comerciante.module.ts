import { NgModule } from "@angular/core";
import { provider as authInterceptorProvider } from './interceptor/auth.interceptor';
import { provider as comercioInterceptorProvider } from './interceptor/comercio.interceptor';
import { AdminComponent } from "./page/admin.component";
import { DashboardComponent } from "./page/dashboard/dashboard.component";
import { ItemComponent } from "./page/item/item.component";
import { CrudComponent } from "./component/crud/crud.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoriaComponent } from "./page/categories/categories.component";
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
import { CategoriaModule } from "./category/category.module";
import { ModalCrudComponent } from "./component/modal-crud/modal-crud.component";
import { LoadingComponent } from "./component/loading/loading.component";
import { ConfiguracionComponent } from "./page/configuracion/configuracion.component";
import { ComercioModule } from "../shared/comercio/comercio.module";
import { ItemApiService } from "./service/item.api.service";

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
        CategoriaModule,
        ComercioModule,
        ItemModule,
    ],
    declarations: [
        // Page
        AdminComponent,
        CategoriaComponent,
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
        // Interceptor
        authInterceptorProvider,
        comercioInterceptorProvider,
        // Guard
        AuthGuard,
    ],
})
export class ComercianteModule { }