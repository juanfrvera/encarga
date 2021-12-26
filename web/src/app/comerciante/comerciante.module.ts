import { NgModule } from "@angular/core";
import { ComercioApi } from "./comercio/comercio.api";
import { provider as authInterceptorProvider } from './interceptor/auth.interceptor';
import { provider as comercioInterceptorProvider } from './interceptor/comercio.interceptor';
import { AdminComponent } from "./page/admin.component";
import { DashboardComponent } from "./page/dashboard/dashboard.component";
import { ItemComponent } from "./page/item/item.component";
import { CrudComponent } from "./component/crud/crud.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoriaComponent } from "./page/categoria/categoria.component";
import { ListaComponent } from "./component/lista/lista.component";
import { ModalComponent } from "./component/modal/modal.component";
import { SharedModule } from "../shared/shared.module";
import { ComercianteRoutingModule } from "./comerciante.routing.module";
import { CategoriaApi } from "./categoria/categoria.api";
import { ApiService } from "./service/api.service";
import { LoginComponent } from "./page/login/login.component";
import { AuthService } from "./service/auth.service";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "./guard/auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { ComercioModule } from "./comercio/comercio.module";
import { ComercioSelectorComponent } from "./page/comercio-selector/comercio-selector.component";
import { ItemModule } from "./feature/item/item.module";
import { CategoriaModule } from "./categoria/categoria.module";

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
        ComercioSelectorComponent,
        DashboardComponent,
        ItemComponent,
        LoginComponent,
        // Component
        CrudComponent,
        ListaComponent,
        ModalComponent,
    ],
    providers: [
        // Service
        ApiService,
        AuthService,
        // Interceptor
        authInterceptorProvider,
        comercioInterceptorProvider,
        // Guard
        AuthGuard,
    ],
})
export class ComercianteModule { }