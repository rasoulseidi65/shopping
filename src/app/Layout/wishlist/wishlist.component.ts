import { Component, OnInit } from '@angular/core';
import {LayoutService} from '../layout.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {CartService} from '../../serviceCart/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [MessageService]
})
export class WishlistComponent implements OnInit {

  wishListId: any[] = [];
  wishList: any[] = [];
  displayBasic: boolean;

  constructor(private service: LayoutService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private serviceCart: CartService,
              public localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorage.getCurrentUser();

    if (this.localStorage.userJson._id !== null){
      this.spinner.show();
      const data = {
        userID: this.localStorage.userJson._id
      };

      this.service.getWishList(data).subscribe((response) => {
        if (response.success === true) {
          this.wishListId = response.data;

          this.wishListId.forEach(item => {
            let id={
              _id: item.productID
            };
            this.service.findProductID(id).subscribe((response) => {
              if (response.success === true) {
                this.wishList.push(...response.data);
              }
            });
          });
        }
        this.spinner.hide();
      });
    }

  }

  delete(id: any): any {
    let wishId = this.wishListId.find(x => x.productID === id)._id;

    this.service.deleteWishList(wishId).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' حذف علاقه مندی ', detail: response.data});
      }
      else{
        this.messageService.add({severity: 'error', summary: ' حذف علاقه مندی ', detail: response.data});
      }
    });
  }

  addToCart(product: any, count: any) {
    if (count <= 0) {
      alert('موجود نمی باشد');
    } else {
      let list = {
        cartList: product,
        number: 1
      };

      this.serviceCart.addToCart(list);
      this.displayBasic = true;

    }
  }
}
