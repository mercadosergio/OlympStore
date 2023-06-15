import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';

import { ProfileComponent } from './pages/profile/profile.component';

import { CategoryComponent } from './pages/category/category.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MycartComponent } from './pages/mycart/mycart.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'category/:id', component: CategoryComponent,
      },
      { path: 'product/:id/:slug', component: ProductDetailComponent },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      { path: 'my-cart', component: MycartComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
