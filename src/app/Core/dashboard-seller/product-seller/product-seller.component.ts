import { Component, OnInit } from '@angular/core';
import {SellerService} from '../seller.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {SellerModel} from '../SellerModel';
import {DialogService} from 'primeng/dynamicdialog';
import {AddProductFeatureComponent} from './add-product-feature/add-product-feature.component';

@Component({
  selector: 'app-product-seller',
  templateUrl: './product-seller.component.html',
  styleUrls: ['./product-seller.component.css'],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class ProductSellerComponent implements OnInit {

  products: any[];
  userData: SellerModel;

  loading = false;
  constructor(private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getSellerFromStorage();
    this.getProducts();

    console.log(this.products);
  }

  getSellerFromStorage(): void{
    if (localStorage.getItem('user') !== null) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
    else{
      this.router.navigateByUrl('/seller/login');
    }
  }

  getProducts(): any{
    this.sellerService.getProducts(this.userData.id).subscribe((response) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  delete(id: any): void {
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

  showAddFeatureDialog(id: string): void {
    const ref = this.dialogService.open(AddProductFeatureComponent, {
      data: {
        id
      },
      header: 'ثبت ویژگی محصول',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getProducts();
      }
    });
  }

}
