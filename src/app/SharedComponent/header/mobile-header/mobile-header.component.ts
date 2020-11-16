import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { Router} from '@angular/router';
import {CartService} from '../../../serviceCart/cart.service';
import {UserService} from '../../../Auth/user.service';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css'],
  providers: [MessageService]
})
export class MobileHeaderComponent implements OnInit {
  @ViewChild('mobileMenu') mobileMenu: ElementRef;
  @ViewChild('accountDropDown') accountDropDown: ElementRef;


  categories: string[] = ['کالای دیجیتال', 'لوازم برقی', 'پوشاک'];
  selectedCategory: any;
  showCartList:boolean;
  valueDynamic = 0;
  highValueDynamic = 250000;
  options: Options = this.getOptions();

  getOptions(): Options {
    return {
      floor: 0,
      ceil: 1000000,
      step: 50000
    };
  }
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
  constructor(private route:Router,
              private serviceCart: CartService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private breakpointObserver: BreakpointObserver,
              private authService: UserService) {

      this.items = [
        {
          label: 'صفحه اصلی',
          icon: 'pi pi-pw pi-home',
          routerLink: '/'
        },
        {
          label: 'محصولات',
          icon: 'pi pi-fw pi-list',
          items: [
            {
              label: 'کالای دیجیتال',
              items: [
                {
                  label: 'گوشی (موبایل فرهادی)',
                  items: [
                    {
                      label: 'سامسونگ',
                      icon: 'pi pi-fw pi-angle-left',
                    }]},
                {
                  label: 'لوازم جانبی گوشی',
                  icon: 'pi pi-fw pi-angle-left',
                }
              ]
            },
            {
              label: 'آرایشی بهداشتی',
              items: [
                {
                  label: 'کرم پودر',
                  icon: 'pi pi-fw pi-angle-left',
                },
                {
                  label: 'رژ لب',
                  icon: 'pi pi-fw pi-angle-left',
                }
              ]},
            {
              label: 'مواد غذایی',
              items: [
                {
                  label: 'رب گوجه فرنگی',
                  icon: 'pi pi-fw pi-angle-left',
                },
                {
                  label: 'روغن مابع',
                  icon: 'pi pi-fw pi-angle-left',
                }
              ]
            },
            {
              label: 'همه محصولات',
              command: event => this.route.navigate(['/home/product'])
            },
          ]
        },
        {
          label: 'تخفیف ها و پیشنهادها',
          icon: 'pi pi-briefcase',
          routerLink: '/'
        },
        {
          label: 'فروشنده شو',
          icon: 'fas fa-shopping-basket',
          command: event => this.route.navigate(['/sellerBe'])
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
  // mobile-links__item mobile-links__item--open collapse-item-1
  ngOnInit(): void {
    setInterval(()=>{
      this.getAllPrice();
    },1000)
    // this.getAllPrice();
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

  showMobileMenu(): void {
    console.log('clicked');
    this.displayMobileMenu = true;
  }
  openMobileMenu(): void {
    this.displayMobileMenu = true;
    // this.mobileMenu.nativeElement.classList.add('mobilemenu--open');
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
  getAllPrice(){
    this.cartlist = this.serviceCart.getItems();
    this.sumOfPrice = 0;
    this.countBadge = 0;
    this.showCartList = true;

    if (this.cartlist != null) {
      if (this.cartlist.length > 0) {
        for (var i = 0; i < this.cartlist.length; i++){
          let count = Number(this.cartlist[i]['product']['number'])*Number(this.cartlist[i]['product']['cartList'].price);
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
        this.displayModalLogin=!this.displayModalLogin;
        localStorage.setItem('user', JSON.stringify( response['data'] ));
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data']});
      }
    });
  }

  register(): void {
    this.authService.onRegister(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        localStorage.setItem('user', JSON.stringify(this.userRegister));
        this.displayModalLogin = !this.displayModalLogin;
      }
      else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data'] });
      }
    });
  }

}
