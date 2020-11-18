import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {LayoutService} from '../layout.service';
import {CartService} from '../../serviceCart/cart.service';
import {MessageService} from 'primeng/api';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [MessageService]

})
export class AllProductsComponent implements OnInit {

  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['<i class="fa fa-chevron-left fa-2x"></i>', '<i class="fa fa-chevron-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    }
  };
  Product: any[];
  displayBasic: boolean;

  constructor(private service: LayoutService,
              private serviceCart: CartService,
              private messageService: MessageService,
  private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.service.allProduct().subscribe((response) => {
      if(response['success']===true){
        this.Product = response['data'];
        this.spinner.hide();
      }

    });
  }

  addCart(product: any, count: any) {
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
