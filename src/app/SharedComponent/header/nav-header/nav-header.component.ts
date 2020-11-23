import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CartService} from '../../../serviceCart/cart.service';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../wish-list.service';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  @ViewChild('basketDropDown') basketDropDown: ElementRef;
  @ViewChild('departments') departments: ElementRef;
  @ViewChild('category1') category1: ElementRef;
  @ViewChild('category2') category2: ElementRef;
  // @ViewChild(LoginRegisterComponent) childComponent: LoginRegisterComponent;
  status = false;
  cartlist: any;
  sumOfPrice = 0;
  countBadge = 0;
  showCartList = true;
  isLogged: boolean;

  constructor(private deviceService: DeviceDetectorService,
              private serviceCart: CartService,
              public wishListService: WishListService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    if (this.isLogged === true){
      if (this.localStorage.userJson.id !== null) {
        this.wishListService.getWishListFromApi(this.localStorage.userJson.id);
      }
    }

    setInterval(() => {
      this.getAllPrice();
    }, 1000);
    // this.getAllPrice();
  }

  toggleBasketDropDown(): void {
    this.basketDropDown.nativeElement.classList.toggle('indicator-display');
    this.basketDropDown.nativeElement.classList.toggle('indicator-open');
  }

  openBasketDropDown(): void {
    if (this.deviceService.isDesktop() === true) {
      this.basketDropDown.nativeElement.classList.add('indicator-display');
      this.basketDropDown.nativeElement.classList.add('indicator-open');
    }
  }

  closeBasketDropDown(): void {
    this.basketDropDown.nativeElement.classList.remove('indicator-display');
    this.basketDropDown.nativeElement.classList.remove('indicator-open');
  }

  toggleDepartments(): void {
    this.departments.nativeElement.classList.toggle('departments--open');
  }

  openDepartments(): void {
    if (this.deviceService.isDesktop() === true) {
      this.departments.nativeElement.classList.add('departments--open');
    }
  }

  closeDepartments(): void {
    this.departments.nativeElement.classList.remove('departments--open');
  }

  toggleCategory1(): void {
    this.category2.nativeElement.classList.remove('departments__submenu--open');
    this.category1.nativeElement.classList.toggle('departments__submenu--open');
  }

  openCategory1(): void {
    if (this.deviceService.isDesktop() === true) {
      this.category2.nativeElement.classList.remove('departments__submenu--open');
      this.category1.nativeElement.classList.add('departments__submenu--open');
    }
  }

  closeCategory1(): void {
    this.category2.nativeElement.classList.remove('departments__submenu--open');
    this.category1.nativeElement.classList.remove('departments__submenu--open');
  }

  toggleCategory2(): void {
    this.category1.nativeElement.classList.remove('departments__submenu--open');
    this.category2.nativeElement.classList.toggle('departments__submenu--open');
  }

  openCategory2(): void {
    if (this.deviceService.isDesktop() === true) {
      this.category1.nativeElement.classList.remove('departments__submenu--open');
      this.category2.nativeElement.classList.add('departments__submenu--open');
    }
  }

  closeCategory2(): void {
    this.category1.nativeElement.classList.remove('departments__submenu--open');
    this.category2.nativeElement.classList.remove('departments__submenu--open');
  }

  closeOthers(): void {
    this.category1.nativeElement.classList.remove('departments__submenu--open');
    this.category2.nativeElement.classList.remove('departments__submenu--open');
  }

  getAllPrice(): void {
    this.cartlist = this.serviceCart.getItems();
    this.sumOfPrice = 0;
    this.countBadge = 0;
    this.showCartList = true;

    if (this.cartlist != null) {
      if (this.cartlist.length > 0) {
        for (let i = 0; i < this.cartlist.length; i++) {
          const count = Number(this.cartlist[i]['product']['number']) * Number(this.cartlist[i]['product']['cartList'].price);
          this.sumOfPrice += count;
          this.countBadge++;
          this.showCartList = false;
        }
      }
    }

  }

  onDeleteCart(item: any): void {
    this.serviceCart.deleteItem(item);
    this.cartlist = this.serviceCart.getItems();
    this.getAllPrice();
  }

}
