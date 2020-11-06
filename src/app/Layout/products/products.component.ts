import { Component, OnInit } from '@angular/core';
import {Options} from 'ng5-slider';
import {LayoutService} from '../layout.service';
import {MessageService, SelectItem} from 'primeng/api';
import {CartService} from '../../serviceCart/cart.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]

})
export class ProductsComponent implements OnInit {

  displaySort = false;
  displayFilter = false;
  valueDynamic = 5000;
  highValueDynamic = 25000000;
  Products: any[];
  product: any[];
  displayBasic: boolean;
  InventoryState = false;
  options: Options = this.getOptions();

  getOptions(): Options {
    return {
      floor: 5000,
      ceil: 25000000,
      step: 10000
    };
  }

  constructor(private service: LayoutService, private serviceCart: CartService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.service.allProduct().subscribe((response) => {
      this.Products = response['data'];

    });
  }

  openFilter(): void {
    this.displayFilter = true;
  }
  openSort(): void {
    this.displaySort = true;
  }


  addCart(products: any): void {
    if (this.InventoryState === true) {
      const list = {
        cartList: products,
        number: 1
      };
      this.serviceCart.addToCart(list);
      this.messageService.add({severity: 'success', summary: ' سبد خرید ', detail: 'کالا به سبد خرید اضافه شد'});

    } else {
      alert('nooo');
    }
  }
}
