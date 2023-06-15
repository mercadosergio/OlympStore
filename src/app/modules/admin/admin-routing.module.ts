import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { GridComponent } from './pages/grid/grid.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryFormComponent } from './pages/category-form/category-form.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      { path: 'grid', component: GridComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'add-product', component: ProductFormComponent },
      { path: 'edit-product/:id', component: ProductFormComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'add-category', component: CategoryFormComponent },
      { path: 'edit-category/:id', component: CategoryFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
