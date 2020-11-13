import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SellerModel} from '../../SellerModel';
import {SellerService} from '../../seller.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';
import {ProductModel} from '../../../dashboardAdmin/Product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [
    MessageService
  ]
})
export class EditProductComponent implements OnInit {

  public form: FormGroup;
  productId: string;
  categories: any[] = [];
  selectedCategory: any;
  product: any;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    categoryID: [
      {type: 'required', message: 'عنوان دسته را انتخاب کنید.'}
    ],
    subCategory: [
      {type: 'required', message: 'عنوان زیر دسته را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان زیر دسته نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    offer: [
      {type: 'required', message: 'تخفیف را انتخاب کنید.'}
    ],
    topText: [
      {type: 'required', message: 'متن بالای محصول را وارد کنید.'},
      {type: 'maxlength', message: 'متن بالای محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    price: [
      {type: 'required', message: 'قیمت محصول را وارد کنید.'}
    ],
    count: [
      {type: 'required', message: 'تعداد محصول را وارد کنید.'}
    ],
    detail: [
      {type: 'required', message: 'جزئیات محصول را وارد کنید.'}
    ],
    briefFeature: [
      {type: 'required', message: 'خلاصه ویژگی های محصول را وارد کنید.'}
    ],
    image: [
      {type: 'required', message: 'تصویر محصول را بارگذاری کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
      this.productId = params.get('id'));

    this.getProduct();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      sellerID: new FormControl(
        this.product.sellerID
      ),
      title: new FormControl(
        this.product.title,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      categoryID: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      subCategory: new FormControl(
        this.product.subCategory,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      count: new FormControl(
        this.product.count,
        [
          Validators.required
        ]
      ),
      price: new FormControl(
        this.product.price,
        [
          Validators.required
        ]
      ),
      topText: new FormControl(
        this.product.topText,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      offer: new FormControl(
        this.product.offer,
        [
          Validators.required
        ]
      ),
      offerPercent: new FormControl(
        this.product.offerPercent,
      ),
      offerText: new FormControl(
        this.product.offerText,
      ),
      detail: new FormControl(
        this.product.detail,
        [
          Validators.required
        ]
      ),
      briefFeature: new FormControl(
        this.product.briefFeature,
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        this.product.image,
        [
          Validators.required
        ]
      ),
      gallery: new FormControl(
        this.product.gallery,
      ),
    });
  }

  submitForm(): void {
    const category = this.form.controls.categoryID.value;
    this.form.controls.categoryID.setValue(category._id);
    console.log(this.form.value);

    this.sellerService.editProduct(this.productId, this.form.value).subscribe((response) => {
      console.log(response);
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' ثبت محصول ', detail: 'محصول با موفقیت ثبت شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });
  }

  getCategories(): void {
    this.sellerService.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
        this.getSelectedCategory();
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getSelectedCategory(): void {
    this.selectedCategory = null;
    this.selectedCategory = this.categories.filter(x => x.value === this.form.controls.categoryID)[0];

    console.log(this.form.controls.categoryID.value);
    this.form.controls.categoryID.setValue(this.selectedCategory);
  }

  getProduct(): void {
    this.sellerService.getProductById(this.productId).subscribe((response) => {
      if (response.success) {
        this.product = response.data[0];

        this.createform();
        this.getCategories();

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      console.log(response.success);
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر محصول ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  onMultipleUpload(event): void {
    const formData = new FormData();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.sellerService.uploadFiles(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.gallery.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر محصول ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

}
