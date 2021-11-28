import { NgModule } from "@angular/core";
import { ComercioService } from "./service/comercio.service";
import { provider as comercioInterceptorProvider } from './interceptor/comercio.interceptor';
import { AdminComponent } from "./page/admin.component";
import { DashboardComponent } from "./page/dashboard/dashboard.component";
import { ItemComponent } from "./page/item/item.component";
import { CrudComponent } from "./component/crud/crud.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { AppRoutingModule } from "../app-routing.module";
import { CategoriaComponent } from "./page/categoria/categoria.component";
import { ListaComponent } from "./component/lista/lista.component";
import { ModalComponent } from "./component/modal/modal.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        AppRoutingModule,
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
        // Component
        CrudComponent,
        ListaComponent,
        ModalComponent,
    ],
    providers: [
        ComercioService,
        comercioInterceptorProvider
    ],
})
export class ComercianteModule { }