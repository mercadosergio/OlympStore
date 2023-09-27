import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { GridComponent } from './pages/grid/grid.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      { path: 'grid', title: 'Administrador - ', component: GridComponent },
      { path: 'tasks', title: 'Administrador - ', component: TasksComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/admin-products.routes').then(
            (r) => r.productRoutes
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/admin-categories.routes').then(
            (r) => r.categoriesRoutes
          ),
      },
    ],
  },
];
