import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {CartService} from '../../../serviceCart/cart.service';
import {UserService} from '../../../Auth/user.service';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {MenuService} from '../../menu.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css'],
  providers: [MessageService]
})
export class MobileHeaderComponent implements OnInit {
  @ViewChild('mobileMenu') mobileMenu: ElementRef;
  @ViewChild('accountDropDown') accountDropDown: ElementRef;

  categories: any[] = [];
  menuCategories: MenuItem[] = [];
  selectedCategory: any;
  showCartList: boolean;
  valueDynamic = 0;
  highValueDynamic = 250000;
  options: Options = this.getOptions();
  isLogged: boolean;
  displayModalLogin: boolean;
  displayForgetpassword: boolean;
  displayRegister: boolean;
  items: MenuItem[];
  displayMobileMenu = false;
  formUser: FormGroup;
  userRegister = {
    mobile: '',
    password: ''
  };
  display = false;
  displaySearch = false;
  cartlist: any;
  sumOfPrice = 0;
  countBadge = 0;

  getOptions(): Options {
    return {
      floor: 0,
      ceil: 1000000,
      step: 50000
    };
  }

  constructor(private router: Router,
              private serviceCart: CartService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private service: MenuService,
              private breakpointObserver: BreakpointObserver,
              private localStorage: LocalStorageService,
              private authService: UserService) {

    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

        let subList: MenuItem[] = [];
        let subSubList: MenuItem[] = [];
        this.categories.forEach(cat => {
          if (cat.SubCategory.length > 0) {
            subList = [];

            subList.push({
              label: 'همه دسته بندی ها',
              command: event => this.goProduct(cat._id, 0, 0)
            });
            cat.SubCategory.forEach(sub => {
              if(sub.SubSubCategory.length > 0){
                subSubList = [];
                subSubList.push({
                  label: 'همه دسته بندی ها',
                  icon: 'pi pi-fw pi-angle-left',
                  command: event => this.goProduct(cat._id, sub._id, 0)
                });
                sub.SubSubCategory.forEach(subSub => {
                  subSubList.push({
                    label: subSub.title,
                    icon: 'pi pi-fw pi-angle-left',
                  });
                });
              }
              subList.push({
                label: sub.title,
                items: subSubList
              });
            });
          }

          this.menuCategories.push({
            label: cat.title,
            items: subList
          })
        });
      }
    });

    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        routerLink: '/'
      },
      {
        label: 'دسته بندی محصولات',
        icon: 'pi pi-fw pi-list',
        items: this.menuCategories
      },
      {
        label: 'فروشنده شو',
        icon: 'fas fa-shopping-basket',
        command: event => this.router.navigate(['/sellerBe'])
      },
      {
        label: 'سوال داری؟',
        icon: 'pi pi-fw pi-question-circle',
        routerLink: '/home/faq'
      },
      {
        label: 'ارتباط با ما',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/home/about'
      }
    ];
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    setInterval(() => {
      this.getAllPrice();
    }, 1000);

    this.formUser = this.fb.group({
      mobile: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required]),
    });
  }

  showModalDialogForgetPassword(): void {
    this.displayModalLogin = false;
    this.displayForgetpassword = !this.displayForgetpassword;
    this.displayRegister = false;
  }

  showModalDialogLogin(): void {
    this.displayModalLogin = true;
    this.displayForgetpassword = false;
    // this.displayRegister = false;
  }

  openMobileMenu(): void {
    this.displayMobileMenu = true;
  }

  closeMobileMenu(): void {
    this.mobileMenu.nativeElement.classList.remove('mobilemenu--open');
  }

  toggleAccountDropDown(): void {
    this.accountDropDown.nativeElement.classList.toggle('topbar-dropdown--opened');
  }

  closeAccountDropDown(): void {
    this.accountDropDown.nativeElement.classList.remove('topbar-dropdown--opened');
  }

  showModalShoppingCart(): void {
    this.display = true;
  }

  getAllPrice() {
    this.cartlist = this.serviceCart.getItems();
    this.sumOfPrice = 0;
    this.countBadge = 0;
    this.showCartList = true;

    if (this.cartlist != null) {
      if (this.cartlist.length > 0) {
        for (var i = 0; i < this.cartlist.length; i++) {
          let count = Number(this.cartlist[i]['product']['number']) * Number(this.cartlist[i]['product']['cartList'].price);
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

  openSearch(): void {
    this.displaySearch = true;
  }

  login(): void {
    this.authService.onLogin(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
        this.displayModalLogin = !this.displayModalLogin;
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data']});
      }
    });
  }

  register(): void {
    this.authService.onRegister(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
        this.displayModalLogin = !this.displayModalLogin;
      } else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data']});
      }
    });
  }

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any) {
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }
}
