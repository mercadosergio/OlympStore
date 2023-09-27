import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';

import { ProfileComponent } from './pages/profile/profile.component';

import { CategoryComponent } from './pages/category/category.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MyOrderComponent } from './pages/my-order/my-order.component';

export const storeRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', title: 'Olymp - Home', component: HomeComponent },
      {
        path: 'category/:id/:slug',
        title: 'Olymp - Categoría',
        component: CategoryComponent,
      },
      {
        path: 'product/:id/:slug',
        title: 'Olymp - Producto',
        component: ProductDetailComponent,
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        title: 'Olymp - Perfil',
        component: ProfileComponent,
      },
      {
        path: 'my-order',
        title: 'Olymp - Orden actual',
        component: MyOrderComponent,
      },
    ],
  },
];
