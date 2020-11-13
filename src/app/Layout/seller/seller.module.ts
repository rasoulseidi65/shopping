import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SellerRoutingModule} from './seller-routing.module';
import {SellerLoginComponent} from './seller-login/seller-login.component';
import {SellerRegisterComponent} from './seller-register/seller-register.component';
import {SellerFooterComponent} from './seller-footer/seller-footer.component';
import {SellerHeaderComponent} from './seller-header/seller-header.component';
import {SellerFeatureComponent} from './seller-feature/seller-feature.component';
import {SellerComponent} from './seller.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [SellerLoginComponent,
    SellerRegisterComponent,
    SellerFooterComponent,
    SellerHeaderComponent,
    SellerFeatureComponent,
    SellerComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    SidebarModule,
    ToastModule
  ],
  // exports: [
  //   SellerRegisterComponent,
  //   SellerFooterComponent,
  //   SellerHeaderComponent,
  //   SellerFeatureComponent,
  //   SellerComponent
  // ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SellerModule {
}
