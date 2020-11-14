import {Component, OnInit} from '@angular/core';
import {SellerModel} from '../SellerModel';
import {SellerService} from '../seller.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AddFeatureDialogComponent} from './add-feature-dialog/add-feature-dialog.component';
import {EditFeatureDialogComponent} from './edit-feature-dialog/edit-feature-dialog.component';
import {EditFeatureValueDialogComponent} from './edit-feature-value-dialog/edit-feature-value-dialog.component';
import {AddFeatureValueDialogComponent} from './add-feature-value-dialog/add-feature-value-dialog.component';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class FeatureComponent implements OnInit {

  features: any[];
  ref: DynamicDialogRef;
  loading = false;

  constructor(private sellerService: SellerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              public dialogService: DialogService,
              private router: Router,
              public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.localStorage.getCurrentUser();
    this.getFeatures();
  }

  getFeatures(): any {
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
      data: {
        _id: this.localStorage.userJson.id
      },
      header: 'ثبت ویژگی محصول جدید',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
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

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
  }

  deleteFeature(featureId: any): any {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

  showAddFeatureValueDialog(featureId: string, titleFarsi: string, titleLatin: string): void {
    const ref = this.dialogService.open(AddFeatureValueDialogComponent, {
      data: {
        featureId
      },
      rtl: false,
      header: 'ثبت مقدار برای ویژگی محصول ' + titleFarsi + '( ' + titleLatin + ' )',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
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

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
  }

  deleteFeatureValue(featureValueId: any): any {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }
}
