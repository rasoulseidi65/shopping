import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AdminserviceService} from '../adminservice.service';
import {ProductModel} from '../Product.model';

interface Category {
  title: string,
  _id: string
}

interface Seller {
  name: string,
  _id: string
}

interface feature {
  titleFarsi: string,
  _id: string
}

interface featureValue {
  value: string,
  featuresID: string,
  _id: string
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {
  @ViewChild('epltable', {static: false}) epltable: ElementRef;
  public formGroup: FormGroup;
  public formGroupProduct: FormGroup;

  public formGroupCategory: FormGroup;
  Category: Category[];
  Sellers: Seller[];
  Feature: feature[];
  FeatureValue: featureValue[];
  product = {
    sellerID: '',
    categoryID: '',
    subCategory: '',
    title: '',
    type: '',
    price: '',
    count: '',
    detail: '',
    offer: 'false',
    offerPercent: '',
    offerText: '',
    countSell: '0',
    topText: '',
    date: '',
    time: '',
    image: '',
    gallery: '',
    features: '',
    specifications: '',
    help: ''
  };
  category = {
    title: '',
  };
  feature = {
    titleFarsi: '',
    titleLatin: '',
  };
  featureValue = {
    titleFarsi: '',
    value: '',
    featuresID: '',
    _id: ''

  };
  productModel: ProductModel[];
  featureValueRegister: any[] = [];
  cols: any[];

  constructor(private  fb: FormBuilder, private service: AdminserviceService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.onDisplayCategory();
    this.onDisplaySeller();
    this.onDisplayFeature();

    this.formGroupCategory = this.fb.group({
      title: new FormControl(['']),
    });
    this.formGroupProduct = this.fb.group({
      subCategory: new FormControl(['']),
      title: new FormControl(['']),
      sellerID: new FormControl(['']),
      categoryID: new FormControl(['']),
      featuresID: new FormControl(['']),
      price: new FormControl(['']),
      count: new FormControl(['']),
      offer: new FormControl(['']),
      offerPercent: new FormControl(['']),
      offerText: new FormControl(['']),
      countSell: new FormControl(['']),
      topText: new FormControl(['']),
      detail: new FormControl(['']),
      date: new FormControl(['']),
      time: new FormControl(['']),
      features: new FormControl(['']),
      specifications: new FormControl(['']),
      help: new FormControl(['']),
    });

    this.formGroup = this.fb.group({
      username: new FormControl(['']),
      password: new FormControl(['']),
      role: new FormControl(['']),
      schoolID: new FormControl(['']),
      schoolName: new FormControl(['']),
      adminName: new FormControl(['']),
      // image: new FormControl(['']),
    });
    this.service.onDisplayProduct().subscribe((response) => {
      if (response['success'] === true) {
        this.productModel = response['data'];
      }
    });
  }

  onUpload(event) {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('image', event.files[i], event.files[i]['name']);
    }
    this.service.uploadFile(formData).subscribe((response) => {
      if (response['success'] === true) {
        this.product.image = response['imagePath'];
      } else {
        console.log(response);
      }
    });
  }

  onMultipleUpload(event) {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i]['name']);
    }
    this.service.multipleUploadFile(formData).subscribe((response) => {
      if (response['success'] === true) {
        this.product.gallery = response['imagePath'];
      } else {
        console.log(response);
      }
    });
  }

  onRegisterProduct() {
    this.service.onRegisterProduct(this.product).subscribe((response) => {
      if (response['success'] === true) {
        let value = {
          productID: response['result']._id,
          productFeature: this.featureValueRegister,
        };
        this.service.onRegisterProductFeature(value).subscribe((response) => {
          if (response['success'] === true) {
            this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'ویژگی محصول با موفقیت ثبت شد'});
          }
        });
        this.clearInput();
        this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'محصول با موفقیت ثبت شد'});
      }
    });
  }

  onRegisterCategory() {
    this.service.onRegisterCategory(this.category).subscribe((response) => {
      if (response['success'] == true) {
        this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'دسته بندی با موفقیت ثبت شد'});

      }
    });

  }

  onDisplayCategory() {
    this.service.onDisplayCategory().subscribe((response) => {
      if (response['success'] === true) {
        this.Category = response['data'];
      }
    });
  }

  xx() {
    this.featureValueRegister.push({
      'featuresID': this.featureValue.featuresID,
      'valueID': this.featureValue._id
    });
  }

  onDisplayFeature() {
    this.service.onDisplayFeature().subscribe((response) => {
      if (response['success'] === true) {
        this.Feature = response['data'];
      }
    });
  }

  onDisplayFeatureValue(id: any) {
    this.featureValue.featuresID = id;
    this.featureValue._id = '';
    let data = {
      featuresID: id
    };
    this.service.onDisplayFeatureValue(data).subscribe((response) => {
      if (response['success'] === true) {
        this.FeatureValue = response['data'];
        this.featureValue._id = response['data'][0]._id;
      }
    });
  }

  onDisplaySeller() {
    this.service.onDisplaySeller().subscribe((response) => {
      if (response['success'] == true) {
        this.Sellers = response['data'];
      }
    });
  }

  clearInput() {
    this.product.title = '';
    this.product.subCategory = '';
    this.product.topText = '';
    this.product.countSell = '';
    this.product.categoryID = '';
    this.product.offerText = '';
    this.product.offer = '';
    this.product.count = '';
    this.product.offerText = '';
    this.product.type = '';
    this.product.date = '';
    this.product.detail = '';
    this.product.time = '';
    this.product.sellerID = '';
  }
}
