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
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryFormComponent } from './pages/category-form/category-form.component';
import { ModalDeleteCategoryComponent } from './components/modal-delete-category/modal-delete-category.component';


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    AdminProductsComponent,
    ModalDeleteProductComponent,
    ProductFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    ModalDeleteCategoryComponent
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
