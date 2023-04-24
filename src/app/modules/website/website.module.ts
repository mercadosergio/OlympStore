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
import { ModalAlertaComponent } from './components/modal-alerta/modal-alerta.component';
import { ImgComponent } from './components/img/img.component';
import { CategoryComponent } from './pages/category/category.component';



@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,
    ProductComponent,
    ProductsComponent,
    ModalAlertaComponent,
    ImgComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebsiteModule { }
