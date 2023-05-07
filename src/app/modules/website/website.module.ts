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
// Material
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from './components/img/img.component';
import { CategoryComponent } from './pages/category/category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebsiteModule { }
