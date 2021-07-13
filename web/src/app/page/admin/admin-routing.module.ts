import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes : Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module').then( m => m.CategoriasPageModule)
      },
      {
        path: 'items',
        loadChildren: () => import('../items/items.module').then( m => m.ItemsPageModule)
      },
      {
        path: '',
        redirectTo: 'categorias',
        pathMatch: 'full'
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
