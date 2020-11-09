import { Component, OnInit } from '@angular/core';
import {SellerService} from '../seller.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {SellerModel} from '../SellerModel';

@Component({
  selector: 'app-product-seller',
  templateUrl: './product-seller.component.html',
  styleUrls: ['./product-seller.component.css'],
  providers: [
    MessageService
  ]
})
export class ProductSellerComponent implements OnInit {

  products: any[];
  userData: SellerModel;

  loading = false;
  constructor(private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSellerFromStorage();
    this.getProducts(this.userData.id);

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

  getProducts(id: any): any{
    this.sellerService.getProducts(id).subscribe((response) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }
}
