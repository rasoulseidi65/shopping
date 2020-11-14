import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductSellerComponent} from './product-seller/product-seller.component';
import {RegisterProductComponent} from './product-seller/register-product/register-product.component';
import {FeatureComponent} from './feature/feature.component';
import {EditProductComponent} from './product-seller/edit-product/edit-product.component';
import {ProductDetailComponent} from '../../Layout/product-detail/product-detail.component';
import {UserGuard} from "../../Auth/Guards/user.guard";
import {AccesslevelGuard} from "../../Auth/Guards/accesslevel.guard";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,

  },
  {
    path: '',

    component: IndexComponent,
    children: [{
      path: 'profile',
      component: ProfileComponent
    }],
  },
  {
    path: '',

    component: IndexComponent,
    children: [{
      path: 'product',
      component: ProductSellerComponent
    }]
  },
  {
    path: '',

    component: IndexComponent,
    children: [{
      path: 'product/add',
      component: RegisterProductComponent
    }]
  },
  {
    path: '',

    component: IndexComponent,
    children: [{
      path: 'product/edit/:id',
      component: EditProductComponent
    }]
  },
  {
    path: '',

    component: IndexComponent,
    children: [{
      path: 'feature',
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
