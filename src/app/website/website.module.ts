import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

import { CategoryComponent } from './pages/category/category.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import { LayoutComponent } from './components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';
// Material
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    CategoryComponent,
    MycartComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    MaterialModule,
    SharedModule
  ]
})
export class WebsiteModule { }
