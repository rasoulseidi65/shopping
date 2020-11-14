import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SellerService} from '../../seller.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {SellerModel} from '../../SellerModel';
import {OverlayService} from '../../../../overlay.service';
import {AddFeatureDialogComponent} from '../../feature/add-feature-dialog/add-feature-dialog.component';
import {DialogService} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css'],
  providers: [
    MessageService
  ]
})
export class RegisterProductComponent implements OnInit {

  public form: FormGroup;
  categories: any[];

  showSelectedFeatures: any[] = [];
  features: any[];
  selectedFeature: any;
  values: any[] = [];
  selectedValues: any[] = [];
  finalSelectedValues: any[] = [];

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
              public overlayService: OverlayService,
              private localstorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.localstorage.getCurrentUser();
    this.getCategories();
    this.getFeatures();
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      sellerID: new FormControl(
        this.localstorage.userJson._id
      ),
      title: new FormControl(
        null,
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
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      count: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      price: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      topText: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      offer: new FormControl(
        false,
        [
          Validators.required
        ]
      ),
      offerPercent: new FormControl(
        0
      ),
      offerText: new FormControl(
        null
      ),
      detail: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      briefFeature: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      gallery: new FormControl(
        null
      )
    });
  }

  submitForm(): void {
    const category = this.form.controls.categoryID.value;
    this.form.controls.categoryID.setValue(category._id);
    console.log(this.form.value);

    this.sellerService.addProduct(this.form.value).subscribe((response) => {

      if (response.success === true) {

        let featureValue: any[] = [];

        this.finalSelectedValues.forEach(item => {

          featureValue.push({
            'featuresID':  item.featuresID,
            'valueID': item.id
          });

        });

        let value = {
          productID: response.result._id,
          productFeature: featureValue,
        };

        console.log(value);
        this.sellerService.addProductFeature(value).subscribe((res) => {
          console.log(res);
          if (res.success === true) {
            console.log(res.success);
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: res.data});
          }
        });

        this.messageService.add({severity: 'success', summary: ' ثبت محصول ', detail: 'محصول با موفقیت ثبت شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });
  }

  getCategories(): any {
    this.sellerService.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  imageUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      this.overlayService.showOverlay = false;
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر محصول ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  onMultipleUpload(event): void {
    this.overlayService.showOverlay = true;

    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.sellerService.uploadFiles(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.form.controls.gallery.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر محصول ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  getFeatures(): any {
    this.sellerService.getFeatures().subscribe((response) => {
      if (response.success === true) {
        this.features = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }
  getFeatureValues(event): void {
    this.values = this.features.find(x => x.id === event.value._id).FeaturesValue;
  }

  addSelectedValues(event: any): void {
    if (event.value !== null) {
      this.finalSelectedValues = [];
      this.finalSelectedValues.push(...event.value);

      this.showSelectedFeatures = [];
      event.value.forEach(item => {
        const parent = this.features.find(x => x.id === item.featuresID).titleFarsi;

        this.showSelectedFeatures.push(
          {
            featureId: item.featureID,
            title: parent,
            valueId: item.id,
            value: item.value
          }
        );
      });
    }
  }

}
