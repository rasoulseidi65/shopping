import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {LayoutService} from '../../Layout/layout.service';
import {CartService} from '../../serviceCart/cart.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService]
})
export class ProductDetailComponent implements OnInit {

  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: true,
    mouseDrag: false,
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
        items: 2
      },
      940: {
        items: 4
      }
    }
  };
  similarProduct: any[];
  responsiveOptions: any[] = [
    {
      breakpoint: '1600px',
      numVisible: 3
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  images: any[] = [];
  relatedProducts: any[];
  product: any[];
  category: any[];
  Inventory: any[];
  InventoryState = false;
  productID: string;
  subCategory: any;
  productFeature: any[] = [];
  featureValue: any[] = [];
  constructor(private service: LayoutService,
              private serviceCart: CartService,
              private messageService: MessageService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
      this.productID = params.get('id'));

    let data = {
      _id: this.productID
    };
    this.images.indexOf(0, this.images.length);
    this.service.findProductID(data).subscribe((response) => {
      console.log(response);
      if (response['success'] === true) {
        this.product = response['data'][0];
        this.subCategory = this.product['subCategory'];
        this.category = response['data'][0]['Category'][0];
        this.Inventory = response['data'][0]['Inventory'][0];
        let PFV = response['data'][0]['ProductFeature'];
        for (let i = 0; i < PFV.length; i++) {
          this.productFeature.push(PFV[i]['Feature']);
          this.featureValue.push(PFV[i]['FeaturesValue']);
        }
        console.log(this.featureValue);
        if (this.Inventory['count'] <= 0) {
          this.InventoryState = true;
        }
        let countGallery = this.product['gallery'];
        for (var i = 0; i < countGallery.length; i++) {
          this.images.push({
            thumbnailImageSrc: 'http://194.5.175.25:3005/' + countGallery[i].destination + '/' + countGallery[i].filename,
            previewImageSrc: 'http://194.5.175.25:3005/' + countGallery[i].destination + '/' + countGallery[i].filename
          });
        }

      }
    });

    let data1 = {
      subCategory: this.subCategory
    };
    this.service.relatedProducts(data1).subscribe((response) => {
      this.relatedProducts = response['data'];
    });


    this.service.hottest().subscribe((response) => {
      if (response['success'] === true) {
        this.similarProduct = response['data'];
        this.Inventory = response['data'][0]['Inventory'][0];
        console.log(this.Inventory);
      }

    });
  }

  addCart(product: any): void {
    if (this.InventoryState === true) {
      const list = {
        cartList: product,
        number: 1
      };
      this.serviceCart.addToCart(list);
      this.messageService.add({severity: 'success', summary: ' سبد خرید ', detail: 'کالا به سبد خرید اضافه شد'});

    } else {
      alert('nooo');
    }
  }

}
