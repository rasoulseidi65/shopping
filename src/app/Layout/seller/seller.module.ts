import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import {SellerLoginComponent} from './seller-login/seller-login.component';
import {SellerRegisterComponent} from './seller-register/seller-register.component';
import {SellerFooterComponent} from './seller-footer/seller-footer.component';
import {SellerHeaderComponent} from './seller-header/seller-header.component';
import {SellerFeatureComponent} from './seller-feature/seller-feature.component';
import {SellerComponent} from './seller.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SellerLoginComponent, SellerRegisterComponent, SellerFooterComponent,SellerHeaderComponent,SellerFeatureComponent,SellerComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SellerModule { }
