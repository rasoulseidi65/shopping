import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {SellerModel} from '../SellerModel';
import {SellerService} from '../seller.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {OverlayService} from '../../../overlay.service';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    MessageService
  ]
})

export class ProfileComponent implements OnInit {
  dateObject = '';
  appComponent: AppComponent;
  business: any[] = [];
  shop: any[] = [];
  contact: any[] = [];
  personal: any[] = [];

  public shopForm: FormGroup;
  public contactForm: FormGroup;
  public businessForm: FormGroup;
  public personalForm: FormGroup;
  states: any[] = [];
  selectedState: any;
  cities: any[] = [];
  selectedCity: any;
  categories: any[] = [];
  selectedCategory: any;
  typesCompany: any[] = [];
  isCompany = false;

  persoanlErrorMessages = {
    firstName: [
      {type: 'required', message: 'نام را وارد کنید.'},
      {type: 'maxlength', message: 'نام نمی تواند از 100 کاراکتر بیشتر باشد.'}
    ],
    lastName: [
      {type: 'required', message: 'نام خانوادگی را وارد کنید.'},
      {type: 'maxlength', message: 'نام خانوادگی نمی تواند از 150 کاراکتر بیشتر باشد.'}
    ],
    password: [
      {type: 'required', message: 'کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'کلمه عبور نمی تواند از 5 کاراکتر کمتر باشد.'}
    ],
    gender: [
      {type: 'required', message: 'جنسیت را انتخاب کنید.'}
    ],
    idNumber: [
      {type: 'required', message: 'شماره شناسنامه را وارد کنید.'},
      {type: 'maxlength', message: 'شماره شناسنامه نمی تواند از 10 رقم بیشتر باشد.'}
    ],
    nationalCode: [
      {type: 'required', message: 'کدملی را وارد کنید.'},
      {type: 'minlength', message: 'کدملی باید 10 رقم باشد.'},
      {type: 'maxlength', message: 'کدملی باید 10 رقم باشد.'}
    ],
    birthDay: [
      {type: 'required', message: 'تاریخ تولد را انتخاب کنید.'}
    ],
    imageNationalcard: [
      {type: 'required', message: 'تصویر کارت ملی را بارگذاری کنید.'}
    ]
  };
  contactErrorMessages = {
    phone: [
      {type: 'required', message: 'تلفن را وارد کنید.'},
      {type: 'minlength', message: 'تلفن باید 11 رقم باشد.'},
      {type: 'maxlength', message: 'تلفن باید 11 رقم باشد.'}
    ],
    state: [
      {type: 'required', message: 'استان را انتخاب کنید.'}
    ],
    city: [
      {type: 'required', message: 'شهر را انتخاب کنید.'}
    ],
    address: [
      {type: 'required', message: 'آدرس را وارد کنید.'},
      {type: 'maxlength', message: 'آدرس نمی تواند از 1000 کاراکتر بیشتر باشد.'}
    ]
  };
  shopErrorMessages = {
    shopName: [
      {type: 'required', message: 'نام فروشگاه را وارد کنید.'}
    ],
    category: [
      {type: 'required', message: 'دسته بندی فروشگاه را انتخاب کنید.'}
    ],
    shabaNumber: [
      {type: 'required', message: 'شماره شبا را وارد کنید.'}
    ],
    logo: [
      {type: 'required', message: 'لوگو را وارد کنید.'}
    ]
  };
  businessErrorMessages = {
    companyName: [
      {type: 'required', message: 'نام فروشگاه را وارد کنید.'}
    ],
    regNumCompany: [
      {type: 'required', message: 'شماره ثبت را انتخاب کنید.'}
    ],
    economicCompany: [
      {type: 'required', message: 'کد اقتصادی را وارد کنید.'}
    ],
    typeCompany: [
      {type: 'required', message: 'نوع فروشگاه را انتخاب کنید.'}
    ],
    signCompany: [
      {type: 'required', message: 'حق امضا را وارد کنید.'}
    ],
    imageSeller: [
      {type: 'required', message: 'تصویر فروشنده را بارگذاری کنید.'}
    ],
    imageCertificate: [
      {type: 'required', message: 'فایل تصویر فروشگاه را بارگذاری کنید.'}
    ],
    imageCompany: [
      {type: 'required', message: 'فایل تصویر فروشگاه را بارگذاری کنید.'}
    ],
    resume: [
      {type: 'required', message: 'فایل رزومه را بارگذاری کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              public overlayService: OverlayService,
              private localStorage: LocalStorageService) {

    this.states = [
      {
        value: '1',
        label: 'آذربایجان شرقی'
      },
      {
        value: '2',
        label: 'آذربایجان غربی'
      },
      {
        value: '3',
        label: 'اردبیل'
      },
      {
        value: '4',
        label: 'اصفهان'
      },
      {
        value: '5',
        label: 'ایلام'
      },
      {
        value: '6',
        label: 'بوشهر'
      },
      {
        value: '7',
        label: 'تهران'
      },
      {
        value: '8',
        label: 'چهارمحال و بختیاری'
      },
      {
        value: '9',
        label: 'خراسان جنوبی'
      },
      {
        value: '10',
        label: 'خراسان رضوی'
      },
      {
        value: '11',
        label: 'خراسان شمالی'
      },
      {
        value: '12',
        label: 'خوزستان'
      },
      {
        value: '13',
        label: 'زنجان'
      },
      {
        value: '14',
        label: 'سمنان'
      },
      {
        value: '15',
        label: 'سیستان و بلوچستان'
      },
      {
        value: '16',
        label: 'فارس'
      },
      {
        value: '17',
        label: 'قزوین'
      },
      {
        value: '18',
        label: 'قم'
      },
      {
        value: '19',
        label: 'گلستان'
      },
      {
        value: '20',
        label: 'گیلان'
      },
      {
        value: '21',
        label: 'لرستان'
      },
      {
        value: '22',
        label: 'مازندران'
      },
      {
        value: '23',
        label: 'مرکزی'
      },
      {
        value: '24',
        label: 'هرمزگان'
      },
      {
        value: '25',
        label: 'همدان'
      },
      {
        value: '26',
        label: 'کردستان'
      },
      {
        value: '27',
        label: 'کرمان'
      },
      {
        value: '28',
        label: 'کرمانشاه'
      },
      {
        value: '29',
        label: 'کهگیلویه و بویر احمد'
      },
      {
        value: '30',
        label: 'یزد'
      },
      {
        value: '31',
        label: 'البرز'
      }

    ];
    this.typesCompany = [
      {label: 'سهامی عام', value: 'سهامی عام'},
      {label: 'سهامی خاص', value: 'سهامی خاص'},
      {label: 'مسولیت محدود', value: 'مسولیت محدود'},
      {label: 'تعاونی', value: 'تعاونی'}
    ];
  }

  ngOnInit(): void {
    this.localStorage.getCurrentUser();
    this.getSeller(this.localStorage.userJson.id);

    if (this.localStorage.userJson.companyName !== null) {
      this.isCompany = true;
    } else {
      this.isCompany = false;
    }

    this.getCategories();

    this.createShopForm();
    this.createContactForm();
    this.createBussinessForm();
    this.createPersonalForm();
    this.getSelectedState();
    this.getSelectedCity();
  }

  createShopForm(): void {
    this.shopForm = this.formBuilder.group({
      shopName: new FormControl(
        this.localStorage.userJson.shopName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      category: new FormControl(
        this.localStorage.userJson.category,
        [
          Validators.required
        ]
      ),
      shabaNumber: new FormControl(
        this.localStorage.userJson.shabaNumber,
        [
          Validators.required
        ]
      ),
      logo: new FormControl(
        this.localStorage.userJson.logo,
        [
          Validators.required
        ]
      ),
    });
  }

  createContactForm(): void {
    this.contactForm = this.formBuilder.group({
      phone: new FormControl(
        this.localStorage.userJson.phone,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11)
        ]
      ),
      state: new FormControl(
        this.localStorage.userJson.state,
        [
          Validators.required
        ]
      ),
      city: new FormControl(
        this.localStorage.userJson.city,
        [
          Validators.required
        ]
      ),
      address: new FormControl(
        this.localStorage.userJson.address,
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      )
    });
  }

  getSelectedState(): void {
    this.selectedState = null;
    if (this.localStorage.userJson.state !== null) {
      this.selectedState = this.states.filter(x => x.label === this.localStorage.userJson.state)[0];
    }
    this.contactForm.controls.state.setValue(this.selectedState);
  }

  getSelectedCity(): void {
    this.selectedCity = null;

    if (this.localStorage.userJson.city !== null) {
      let selectedState = this.states.filter(x => x.label === this.localStorage.userJson.state)[0];
      this.stateOnChange(selectedState.value);
      this.selectedCity = this.cities.filter(x => x.label === this.localStorage.userJson.city)[0];
    }
    this.contactForm.controls.city.setValue(this.selectedCity);
  }

  getSelectedCategory(): void {
    this.selectedCategory = null;

    if (this.localStorage.userJson.category !== null) {
      this.selectedCategory = this.categories.filter(x => x.title === this.localStorage.userJson.category)[0];
    }
    this.shopForm.controls.category.setValue(this.selectedCategory);
  }

  createBussinessForm(): void {
    this.businessForm = this.formBuilder.group({
      companyName: new FormControl(
        this.localStorage.userJson.companyName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      signCompany: new FormControl(
        this.localStorage.userJson.signCompany,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      regNumCompany: new FormControl(
        this.localStorage.userJson.regNumCompany,
        [
          Validators.required
        ]
      ),
      economicCompany: new FormControl(
        this.localStorage.userJson.economicCompany,
        [
          Validators.required
        ]
      ),
      typeCompany: new FormControl(
        this.localStorage.userJson.typeCompany,
        [
          Validators.required
        ]
      ),
      imageSeller: new FormControl(
        this.localStorage.userJson.imageSeller,
        [
          Validators.required
        ]
      ),
      imageCertificate: new FormControl(
        this.localStorage.userJson.imageCertificate,
        [
          Validators.required
        ]
      ),
      imageCompany: new FormControl(
        this.localStorage.userJson.imageCompany,
        [
          Validators.required
        ]
      ),
      resume: new FormControl(
        this.localStorage.userJson.resume,
        [
          Validators.required
        ]
      ),
    });
  }

  createPersonalForm(): void {
    this.personalForm = this.formBuilder.group({
      firstName: new FormControl(
        this.localStorage.userJson.firstName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      lastName: new FormControl(
        this.localStorage.userJson.lastName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      gender: new FormControl(
        this.localStorage.userJson.gender,
        [
          Validators.required
        ]
      ),
      idNumber: new FormControl(
        this.localStorage.userJson.idNumber,
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ),
      nationalCode: new FormControl(
        this.localStorage.userJson.nationalCode,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ),
      birthDay: new FormControl(
        this.localStorage.userJson.birthDay,
        [
          Validators.required
        ]
      ),
      imageNationalcard: new FormControl(
        this.localStorage.userJson.imageNationalcard,
        [
          Validators.required
        ]
      ),
    });
  }

  stateOnChange(code: string): void {
    this.cities = [];
    switch (code) {
      case '1': {
        this.cities = [
          {
            value: '1',
            label: 'آذرشهر'
          },
          {
            value: '2',
            label: 'اسکو'
          },
          {
            value: '3',
            label: 'اهر'
          },
          {
            value: '4',
            label: 'بستان آباد'
          },
          {
            value: '5',
            label: 'بناب'
          },
          {
            value: '6',
            label: 'تبریز'
          },
          {
            value: '7',
            label: 'جلفا'
          },
          {
            value: '8',
            label: 'چار اویماق'
          },
          {
            value: '9',
            label: 'سراب'
          },
          {
            value: '10',
            label: 'شبستر'
          },
          {
            value: '11',
            label: 'عجب شیر'
          },
          {
            value: '12',
            label: 'مراغه'
          },
          {
            value: '13',
            label: 'مرند'
          },
          {
            value: '14',
            label: 'ملکان'
          },
          {
            value: '15',
            label: 'میانه'
          },
          {
            value: '16',
            label: 'هریس'
          },
          {
            value: '17',
            label: 'هشترود'
          },
          {
            value: '18',
            label: 'ورزقان'
          },
          {
            value: '19',
            label: 'کلیبر'
          },
          {
            value: '20',
            label: 'خدا آفرین'
          }
        ];
        break;
      }
      case '2': {
        this.cities = [
          {
            value: '21',
            label: 'ارومیه'
          },
          {
            value: '22',
            label: 'اشنویه'
          },
          {
            value: '23',
            label: 'بوکان'
          },
          {
            value: '24',
            label: 'پیرانشهر'
          },
          {
            value: '25',
            label: 'تکاب'
          },
          {
            value: '26',
            label: 'چالدران'
          },
          {
            value: '27',
            label: 'خوی'
          },
          {
            value: '28',
            label: 'سردشت'
          },
          {
            value: '29',
            label: 'سلماس'
          },
          {
            value: '30',
            label: 'شاهین دژ'
          },
          {
            value: '31',
            label: 'ماکو'
          },
          {
            value: '32',
            label: 'مهاباد'
          },
          {
            value: '33',
            label: 'میاندوآب'
          },
          {
            value: '34',
            label: 'نقده'
          },
          {
            value: '35',
            label: 'شوط'
          },
          {
            value: '36',
            label: 'پلدشت'
          },
          {
            value: '37',
            label: 'چابیاره'
          }
        ];
        break;
      }
      case '3': {
        this.cities = [
          {
            value: '38',
            label: 'اردبیل'
          },
          {
            value: '39',
            label: 'پیله سوار'
          },
          {
            value: '40',
            label: 'پارس آباد'
          },
          {
            value: '41',
            label: 'خلخال'
          },
          {
            value: '42',
            label: 'گرمی'
          },
          {
            value: '43',
            label: 'مشکین شهر'
          },
          {
            value: '44',
            label: 'نمین'
          },
          {
            value: '45',
            label: 'نیر'
          },
          {
            value: '46',
            label: 'کوثر'
          },
          {
            value: '47',
            label: 'سرعین'
          }

        ];
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  submitShopForm(): void {
    const category = this.shopForm.controls.category.value;
    this.shopForm.controls.category.setValue(category.title);

    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const personal = this.personalForm.value;
    const bussiness = this.businessForm.value;

    const formData = {
      ...shop, ...contact, ...personal, ...bussiness
    };
    this.sellerService.updateSeller(this.localStorage.userJson.id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson.id);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitContactForm(): void {
    const state = this.contactForm.controls.state.value;
    this.contactForm.controls.state.setValue(state.label);

    const city = this.contactForm.controls.city.value;
    this.contactForm.controls.city.setValue(city.label);

    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const personal = this.personalForm.value;
    const bussiness = this.businessForm.value;

    const formData = {
      ...shop, ...contact, ...personal, ...bussiness
    };

    this.sellerService.updateSeller(this.localStorage.userJson.id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson.id);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitPersonalForm(): void {
    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const personal = this.personalForm.value;

    const formData = {
      ...shop, ...contact, ...personal
    };

    this.sellerService.updateSeller(this.localStorage.userJson.id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson.id);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitBusinessForm(): void {
    const shop = this.shopForm.value;
    const contact = this.contactForm.value;
    const business = this.businessForm.value;

    const formData = {
      ...shop, ...contact, ...business
    };

    this.sellerService.updateSeller(this.localStorage.userJson.id, formData).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.localStorage.userJson.id);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  getSeller(id: any): void {
    this.sellerService.getSeller(id).subscribe((response) => {
      console.log(response);
      if (response.success === true) {
        console.log(response.data);
        this.localStorage.saveCurrentUser(response.data);
        this.localStorage.getCurrentUser();
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
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

  logoUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.shopForm.controls.logo.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود لوگو ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود لوگو ', detail: response.data});
      }
    });
  }

  imageSellerUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.imageSeller.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر فروشنده ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر فروشنده ', detail: response.data});
      }
    });
  }

  imageNationalcardUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.personalForm.controls.imageNationalcard.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر کارت ملی ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر کارت ملی ', detail: response.data});
      }
    });
  }

  imageCertificateUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.imageCertificate.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود گواهی ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود گواهی ', detail: response.data});
      }
    });
  }

  imageCompanyUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.imageCompany.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر فروشگاه ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر فروشگاه ', detail: response.data});
      }
    });
  }

  resumeUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.businessForm.controls.resume.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود رزومه ', detail: 'فایل با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود رزومه ', detail: response.data});
      }
    });
  }

  isCompanyOnChange(): void {
    this.isCompany = !this.isCompany;
  }
}
