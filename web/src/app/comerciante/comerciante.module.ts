import { NgModule } from "@angular/core";
import { ComercioService } from "./service/comercio.service";
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
import { CategoriaService } from "./service/categoria.service";
import { ApiService } from "./service/api.service";
import { LoginComponent } from "./page/login/login.component";

@NgModule({
    imports: [
        ComercianteRoutingModule,
        FormsModule,
        NgSelectModule,
        // App
        SharedModule
    ],
    declarations: [
        // Page
        AdminComponent,
        CategoriaComponent,
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
        CategoriaService,
        ComercioService,
        // Interceptor
        comercioInterceptorProvider
    ],
})
export class ComercianteModule { }