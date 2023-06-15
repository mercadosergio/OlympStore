import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { ExitGuard } from './guards/exit.guard';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
