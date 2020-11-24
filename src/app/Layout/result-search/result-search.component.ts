import {Component, OnInit} from '@angular/core';
import {Options} from "ng5-slider";
import {ActivatedRoute, Router} from "@angular/router";
import {LayoutService} from "../layout.service";
import {CartService} from "../../serviceCart/cart.service";
import {MessageService} from "primeng/api";
import {NgxSpinnerService} from "ngx-spinner";
import {SearchService} from "../../search.service";
@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css'],
  providers: [MessageService]
})
export class ResultSearchComponent implements OnInit {
  items = [];
  pageOfItems: Array<any>;
  categories: any[] = [];
  displaySort = false;
  displayFilter = false;
  valueDynamic = 1000000;
  highValueDynamic = 50000000;
  Products: any[];
  FilteredProducts: any[];
  product: any[];
  displayBasic: boolean;
  options: Options = {
    floor: 1000000,
    ceil: 50000000,
    step: 1000000
  };
  countOfProduct = 7;
  priceList: number[] = [];
  resultSearch:boolean;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: LayoutService,
              private serviceCart: CartService,
              private messageService: MessageService,
              private spinner: NgxSpinnerService,
              private servicSearch:SearchService
              ) {
  }

  ngOnInit(): void {
    if(this.servicSearch.resultSearchBox.length>0){
      this.resultSearch =true
    this.Products=this.servicSearch.resultSearchBox;
    // this.spinner.show();
    this.getCategories();
    // this.service.allProduct().subscribe((response) => {
      // this.Products = response['data'];
      this.FilteredProducts = this.Products;
      this.Products.forEach(item => {
        this.priceList.push(Number.parseInt(item.price));
      });

      this.valueDynamic = Math.min(...this.priceList);
      this.highValueDynamic = Math.max(...this.priceList);

      this.options = {
        floor: this.valueDynamic,
        ceil: this.highValueDynamic,
        step: 1000000
      };
      this.countOfProduct =this.servicSearch.resultSearchBox.length;
      this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
    }
    else{
      this.resultSearch =false
    }
  }

  getCategories(): any {
    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.spinner.hide();
        this.categories = response.data;
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

  filterByCategory(id: string): void {
    this.FilteredProducts = [];

    this.Products.forEach(item => {
      if (item.categoryID === id) {
        this.FilteredProducts.push(item);
      }
    });
    this.countOfProduct = this.FilteredProducts.length;
    this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
  }

  filterByPrice(): void {
  }

  showAllCategories(): void {
    this.FilteredProducts = this.Products;
    this.countOfProduct = this.FilteredProducts.length;
    this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
  }
}
