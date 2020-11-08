import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {ProductsComponent} from "./products/products.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {CompanyComponent} from "./company/company.component";
import {ProductFeatureComponent} from './product-feature/product-feature.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'product',
      component: ProductsComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'homepage',
      component: HomepageComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'seller',
      component: CompanyComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'feature',
      component: ProductFeatureComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule {
}
