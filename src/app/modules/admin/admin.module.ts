import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../shared/material/material.module';
import { DialogModule } from '@angular/cdk/dialog';

import { LayoutComponent } from './components/layout/layout.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { GridComponent } from './pages/grid/grid.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ModalDeleteProductComponent } from './components/modal-delete-product/modal-delete-product.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    AdminProductsComponent,
    ModalDeleteProductComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule
  ]
})
export class AdminModule { }
