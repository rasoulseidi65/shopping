import {Component, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Options} from 'ng5-slider';
import {LayoutService} from '../layout.service';
import {MessageService, SelectItem} from 'primeng/api';
import {CartService} from '../../serviceCart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]

})
export class ProductsComponent implements OnInit {


  pager: any = {};
  items = [];
  pageOfItems: Array<any>;

  displaySort = false;
  displayFilter = false;
  valueDynamic = 5000;
  highValueDynamic = 25000000;
  Products: any[];
  product: any[];
  displayBasic: boolean;
  InventoryState = false;
  options: Options = this.getOptions();
  countOfProduct: number = 7;

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
      this.countOfProduct= response['data'].length;
      this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i + 1), name: `Item ${i + 1}`}));

    });


  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    console.log(pageOfItems);
    this.pageOfItems = pageOfItems;
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
