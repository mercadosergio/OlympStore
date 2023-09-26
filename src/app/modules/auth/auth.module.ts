import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from '../shared/components/logo/logo.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, LogoComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthModule {}
