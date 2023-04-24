import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { ExitGuard } from './guards/exit.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    canDeactivate: [ExitGuard],
    component: RegisterComponent
  },
  { path: 'cms', canActivate: [AdminGuard], loadChildren: () => import('./modules/cms/cms.module').then(m => m.CmsModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
