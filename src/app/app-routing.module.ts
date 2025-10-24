// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent } from '../app/product-dashboard/product-dashboard.component';

// 1. Define aquí tus rutas
const routes: Routes = [
  {
    path: 'products',
    component: ProductDashboardComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: '**', // Ruta para URLs no encontradas
    redirectTo: '/products'
  }
];

// 2. Crea y exporta el NgModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
