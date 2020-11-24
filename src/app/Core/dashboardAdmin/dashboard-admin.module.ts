import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { IndexComponent } from './index/index.component';
import {SharedmoduleModule} from "../../SharedModule/sharedmodule.module";
import { ProductsComponent } from './products/products.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HomepageComponent } from './homepage/homepage.component';
import { CompanyComponent } from './company/company.component';
import { ProductFeatureComponent } from './product-feature/product-feature.component';
import { CommentsComponent } from './comments/comments.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [IndexComponent, ProductsComponent, HomepageComponent, CompanyComponent, ProductFeatureComponent, CommentsComponent],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    SharedmoduleModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class DashboardAdminModule { }
