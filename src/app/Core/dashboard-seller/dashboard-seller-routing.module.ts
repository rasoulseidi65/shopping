import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductSellerComponent} from './product-seller/product-seller.component';
import {RegisterProductComponent} from './product-seller/register-product/register-product.component';
import {FeatureComponent} from './feature/feature.component';
import {EditProductComponent} from './product-seller/edit-product/edit-product.component';

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
    path: 'product/add',
    component: IndexComponent,
    children: [{
      path: '',
      component: RegisterProductComponent
    }]
  },
  {
    path: 'product/edit',
    component: IndexComponent,
    children: [{
      path: '',
      component: EditProductComponent
    }]
  },
  {
    path: 'feature',
    component: IndexComponent,
    children: [{
      path: '',
      component: FeatureComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSellerRoutingModule {
}
