import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductSellerComponent} from './product-seller/product-seller.component';
import {RegisterProductComponent} from './product-seller/register-product/register-product.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: IndexComponent
  },
  {
    path: 'profile',
    component: IndexComponent,
    children: [{
      path: '',
      component: ProfileComponent
    }]
  },
  {
    path: 'product',
    component: IndexComponent,
    children: [{
      path: '',
      component: ProductSellerComponent
    }]
  },
  {
    path: 'product/register',
    component: IndexComponent,
    children: [{
      path: '',
      component: RegisterProductComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSellerRoutingModule {
}
