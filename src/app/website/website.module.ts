import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WebsiteRoutingModule } from './website-routing.module';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

import { MycartComponent } from './pages/mycart/mycart.component';

import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';


import { LayoutComponent } from './components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';
// Material
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

// import { QuicklinkModule } from 'ngx-quicklink';



@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,

    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    // QuicklinkModule
  ]
})
export class WebsiteModule { }
