import { Routes } from '@angular/router';
import { CategoryFormComponent } from './pages/category-form/category-form.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';

export const categoriesRoutes: Routes = [
  {
    path: 'categories',
    title: 'Administrador - ',
    component: CategoryListComponent,
  },
  {
    path: 'add-category',
    title: 'Administrador - ',
    component: CategoryFormComponent,
  },
  {
    path: 'edit-category/:id',
    title: 'Administrador - ',
    component: CategoryFormComponent,
  },
];
