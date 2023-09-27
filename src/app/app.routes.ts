import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { ExitGuard } from './guards/exit.guard';
import { NotFoundComponent } from './modules/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/store/store.routes').then((m) => m.storeRoutes),
    data: {
      preload: true,
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.authroutes),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./modules/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Olymp - Página no encontrada',
  },
];
