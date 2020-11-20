import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {LayoutService} from '../layout.service';
import {CartService} from '../../serviceCart/cart.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {NavHeaderComponent} from '../../SharedComponent/header/nav-header/nav-header.component';
import {NgxSpinnerService} from "ngx-spinner";
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
  providers: [MessageService]
})
export class DiscountComponent implements OnInit {
  @ViewChild('NavHeaderComponent') nav: NavHeaderComponent;
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
  hottestProduct: any[];
  Inventory: any;
  displayBasic: boolean;
  displayNotProduct: boolean;

  constructor(private service: LayoutService,
              private serviceCart: CartService,
              private router: Router,
              private localStorage: LocalStorageService,
              private messageService: MessageService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.service.hottest().subscribe((response) => {
      if (response['success'] === true) {
        this.hottestProduct = response['data'];
        console.log(response['data'])
        this.Inventory = response['data'][0]['Inventory'][0];
        this.spinner.hide()
      }

    });
  }

  addToWishList(id: any): void {

    if (this.localStorage.userData !== null) {

      let data = {
        userID: this.localStorage.userJson.id,
        productID: id
      };
      this.service.addWishList(data).subscribe((response) => {
        if (response['success'] === true) {
          this.messageService.add({severity: 'success', summary: ' ثبت علاقه مندی ', detail: response.data});
        }
        else{
          this.messageService.add({severity: 'error', summary: ' ثبت علاقه مندی ', detail: response.data});
        }
      });
    }

  }
  addCart(product: any, count: any) {
    if (count <= 0) {
      this.displayNotProduct=true;
    } else {

      let list = {
        cartList: product,
        number: 1
      };

      this.serviceCart.addToCart(list);
      this.displayBasic = true;

      // this.messageService.add({severity: 'success', summary: ' سبد خرید ', detail: 'کالا به سبد خرید اضافه شد'});

    }
  }

  goCart() {
    this.displayBasic = !this.displayBasic;
    this.router.navigate(['/home/cart']);
  }
}
