import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { MaterialModule } from '../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    MaterialModule,
    FontAwesomeModule
  ]
})
export class CmsModule { }
