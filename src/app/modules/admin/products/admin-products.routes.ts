import { Routes } from '@angular/router';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

export const productRoutes: Routes = [
  {
    path: 'products',
    title: 'Administrador - ',
    component: ProductsListComponent,
  },
  {
    path: 'add-product',
    title: 'Administrador - ',
    component: ProductFormComponent,
  },
  {
    path: 'edit-product/:id',
    title: 'Administrador - ',
    component: ProductFormComponent,
  },
];
