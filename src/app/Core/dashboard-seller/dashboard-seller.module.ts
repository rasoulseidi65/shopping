import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardSellerRoutingModule} from './dashboard-seller-routing.module';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import {SharedcomponentModule} from '../../SharedComponent/sharedcomponent.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexComponent} from './index/index.component';
import {ProfileComponent} from './profile/profile.component';
import {DropdownModule} from 'primeng/dropdown';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {ProductSellerComponent} from './product-seller/product-seller.component';
import {RegisterProductComponent} from './product-seller/register-product/register-product.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FeatureComponent} from './feature/feature.component';
import {AddFeatureDialogComponent} from './feature/add-feature-dialog/add-feature-dialog.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { EditFeatureDialogComponent } from './feature/edit-feature-dialog/edit-feature-dialog.component';
import { AddFeatureValueDialogComponent } from './feature/add-feature-value-dialog/add-feature-value-dialog.component';
import { EditFeatureValueDialogComponent } from './feature/edit-feature-value-dialog/edit-feature-value-dialog.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    ProductSellerComponent,
    RegisterProductComponent,
    FeatureComponent,
    AddFeatureDialogComponent,
    EditFeatureDialogComponent,
    AddFeatureValueDialogComponent,
    EditFeatureValueDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardSellerRoutingModule,
    SharedmoduleModule,
    SharedcomponentModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgPersianDatepickerModule,
    InputSwitchModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AddFeatureDialogComponent,
    EditFeatureDialogComponent,
    AddFeatureValueDialogComponent,
    EditFeatureValueDialogComponent
  ]
})
export class DashboardSellerModule {
}
