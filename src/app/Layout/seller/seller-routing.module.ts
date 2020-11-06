import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SellerLoginComponent} from './seller-login/seller-login.component';
import {SellerRegisterComponent} from './seller-register/seller-register.component';
import {SellerComponent} from './seller.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent
  },
  {
    path: 'login',
    component: SellerLoginComponent
  },
  {
    path: 'register',
    component: SellerRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {
}
