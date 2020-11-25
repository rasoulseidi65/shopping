import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {LayoutService} from '../layout.service';
import {MenuItem, MessageService} from 'primeng/api';
import {CartService} from '../../serviceCart/cart.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../SharedComponent/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]

})
export class ProductsComponent implements OnInit {

  items = [];
  pageOfItems: Array<any>;
  categories: any[] = [];
  menuCategories: MenuItem[] = [];
  currentCategory: any;
  currentSubCategory: any;
  currentSubSubCategory: any;
  displaySort = false;
  displayFilter = false;
  valueDynamic = 1000000;
  highValueDynamic = 50000000;
  Products: any[];
  FilteredProducts: any[] = [];
  displayBasic: boolean;
  options: Options = {
    floor: 1000000,
    ceil: 50000000,
    step: 1000000
  };
  countOfProduct = 5;
  priceList: number[] = [];
  categoryId: any;
  subCategoryId: any;
  subSubCategoryId: any;
  isLogged: boolean;

  constructor(private router: Router,
              private service: LayoutService,
              private serviceCart: CartService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private wishListService: WishListService,
              private localStorage: LocalStorageService,
              private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('cat');
      this.subCategoryId = params.get('sub');
      this.subSubCategoryId = params.get('sub2');
    });

    this.getCategories();

    this.service.allProduct().subscribe((response) => {
      this.Products = response['data'];

      if (this.subSubCategoryId != 0) {
        this.Products.forEach(item => {
          if (item.subsubCategory === this.subSubCategoryId) {
            this.FilteredProducts.push(item);
          }
        });
      }
      else if (this.subCategoryId != 0) {
        this.Products.forEach(item => {
          if (item.subCategory === this.subCategoryId) {
            this.FilteredProducts.push(item);
          }
        });
      }
      else if (this.categoryId != 0) {
        this.Products.forEach(item => {
          if (item.categoryID === this.categoryId) {
            this.FilteredProducts.push(item);
          }
        });
      }
      else {
        this.FilteredProducts = this.Products;
      }

      this.FilteredProducts.forEach(item => {
        this.priceList.push(Number.parseInt(item.price));
      });

      this.valueDynamic = Math.min(...this.priceList);
      this.highValueDynamic = Math.max(...this.priceList);

      this.options = {
        floor: this.valueDynamic,
        ceil: this.highValueDynamic,
        step: 1000000
      };
      this.countOfProduct = response['data'].length;
      this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
    });
  }

  getCategories(): any {
    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.spinner.hide();
        this.categories = response.data;

        if(this.categoryId != 0){
          this.currentCategory = this.categories.find(x => x._id === this.categoryId);
        }
        if(this.subCategoryId != 0){
          const cat = this.categories.find(x => x._id === this.categoryId);
          this.currentSubCategory = cat.SubCategory.find(x => x._id === this.subCategoryId);
        }
        if(this.subSubCategoryId != 0){
          const cat = this.categories.find(x => x._id === this.categoryId);
          const sub = cat.SubCategory.find(x => x._id === this.subCategoryId);
          this.currentSubSubCategory = sub.SubSubCategory.find(x => x._id === this.subSubCategoryId);
        }

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت دسته بندی ', detail: response.data});
      }
    });
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }

  openFilter(): void {
    this.displayFilter = true;
  }

  openSort(): void {
    this.displaySort = true;
  }

  addCart(products: any): void {

    // if (this.InventoryState === true) {
    const list = {
      cartList: products,
      number: 1
    };
    this.serviceCart.addToCart(list);
    this.displayBasic = true;

    // } else {
    //   alert('nooo');
    // }
  }

  goDetail(id: any): void {
    this.router.navigate(['/home/detail/' + id]);
  }

  goCart(): void {
    this.displayBasic = !this.displayBasic;
    this.router.navigate(['/home/cart']);
  }

  filterByPrice(): void {
  }


  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any) {
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }

  addToWishList(id: any): void {

    if (this.isLogged) {
      if (this.localStorage.userJson.id !== null) {
        const data = {
          userID: this.localStorage.userJson.id,
          productID: id
        };
        this.service.addWishList(data).subscribe((response) => {
          if (response.success === true) {
            this.wishListService.getWishListFromApi(this.localStorage.userJson.id);
            this.messageService.add({severity: 'success', summary: ' ثبت علاقه مندی ', detail: response.data});
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت علاقه مندی ', detail: response.data});
          }
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
      }
    }
    else{
      this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
    }
  }
}
