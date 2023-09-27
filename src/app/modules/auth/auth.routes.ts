import { Routes } from '@angular/router';
import { ExitGuard } from 'src/app/guards/exit.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authroutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    canDeactivate: [ExitGuard],
    component: RegisterComponent,
  },
];
