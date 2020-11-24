import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CartService} from '../../../serviceCart/cart.service';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../wish-list.service';
import {MenuService} from '../../menu.service';
import {Route, Router} from '@angular/router';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  @ViewChild('basketDropDown') basketDropDown: ElementRef;
  @ViewChild('departments') departments: ElementRef;
  @ViewChild('category') category: ElementRef;

  status = false;
  cartlist: any;
  sumOfPrice = 0;
  countBadge = 0;
  showCartList = true;
  isLogged: boolean;
  categories: any[] = [];
  subCategories: any[] = [];
  currentCat: any;

  constructor(private deviceService: DeviceDetectorService,
              private serviceCart: CartService,
              public wishListService: WishListService,
              public service: MenuService,
              public router: Router,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    if (this.isLogged === true) {
      if (this.localStorage.userJson.id !== null) {
        this.wishListService.getWishListFromApi(this.localStorage.userJson.id);
      }
    }

    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
      }
    });

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

  toggleCategory(id: any) {

    const cat = this.categories.find(x => x._id === id);
    this.subCategories = cat.SubCategory;
    this.currentCat = id;
    if (this.subCategories.length === 0) {
      // NO data to show
      this.goProduct(id, 0, 0);
    }

  }

  openCategory(id: any): void {
    if (this.deviceService.isDesktop() === true) {
      this.category.nativeElement.classList.remove('departments__submenu--open');

      const cat = this.categories.find(x => x._id === id);
      this.subCategories = cat.SubCategory;

      this.currentCat = id;
      if (this.subCategories.length > 0) {
        this.category.nativeElement.classList.add('departments__submenu--open');
      }

    }
  }

  closeCategory(): void {
    this.category.nativeElement.classList.remove('departments__submenu--open');
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

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any) {
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }
}
