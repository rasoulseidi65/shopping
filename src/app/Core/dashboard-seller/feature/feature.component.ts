import { Component, OnInit } from '@angular/core';
import {SellerModel} from '../SellerModel';
import {SellerService} from '../seller.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AddFeatureDialogComponent} from './add-feature-dialog/add-feature-dialog.component';
import {EditFeatureDialogComponent} from './edit-feature-dialog/edit-feature-dialog.component';
import {EditFeatureValueDialogComponent} from './edit-feature-value-dialog/edit-feature-value-dialog.component';
import {AddFeatureValueDialogComponent} from './add-feature-value-dialog/add-feature-value-dialog.component';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
  providers: [
    MessageService,
    DialogService
  ]
})
export class FeatureComponent implements OnInit {

  features: any[];
  userData: SellerModel;
  ref: DynamicDialogRef;
  loading = false;
  constructor(private sellerService: SellerService,
              private messageService: MessageService,
              public dialogService: DialogService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSellerFromStorage();
    this.getFeatures();
  }

  getSellerFromStorage(): void{
    if (localStorage.getItem('user') !== null) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
    else{
      this.router.navigateByUrl('/seller/login');
    }
  }

  getFeatures(): any{
    this.sellerService.getFeatures().subscribe((response) => {
      if (response.success === true) {
        this.features = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  showAddFeatureDialog(): void {
    const ref = this.dialogService.open(AddFeatureDialogComponent, {
      header: 'ثبت ویژگی محصول جدید',
      width: '70%'
    });
  }

  addFeature(sellerId: any): any{

  }

  showEditFeatureDialog(id: string, titleFarsi: string, titleLatin: string): void {
    const ref = this.dialogService.open(EditFeatureDialogComponent, {
      data: {
        id,
        titleFarsi,
        titleLatin
      },
      header: 'ویرایش ویژگی محصول',
      width: '70%'
    });
  }

  editFeature(id: any): any{

  }

  deleteFeature(id: any): any{

  }


  showAddFeatureValueDialog(titleFarsi: string, titleLatin: string): void {
    const ref = this.dialogService.open(AddFeatureValueDialogComponent, {
      header: 'ثبت مقدار برای ویژگی محصول ' + titleFarsi + '( ' + titleLatin + ' )',
      width: '70%'
    });
  }

  addFeatureValue(featureId: any): any{

  }

  showEditFeatureValueDialog(id: string, value: string): void {
    const ref = this.dialogService.open(EditFeatureValueDialogComponent, {
      data: {
        id,
        value
      },
      header: 'ویرایش مقدار ویژگی محصول',
      width: '70%'
    });
  }

  editFeatureValue(id: any): any{

  }

  deleteFeatureValue(id: any): any{

  }
}
