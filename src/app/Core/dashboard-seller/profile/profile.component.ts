import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {SellerModel} from '../SellerModel';
import {SellerService} from '../seller.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    MessageService
  ]
})

export class ProfileComponent implements OnInit {

  public personalForm: FormGroup;
  public contactForm: FormGroup;
  public businessForm: FormGroup;
  states: any[];
  cities: any[];
  categories: any[];
  typesCompany: any[];
  isCompany = false;
  userData: SellerModel = new SellerModel(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
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
    ],
    birthDay: [
      {type: 'required', message: 'تاریخ تولد را انتخاب کنید.'}
    ],
    imageNationalcard: [
      {type: 'required', message: 'تصویر کارت ملی را بارگذاری کنید.'}
    ],
  };
  contactErrorMessages = {
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
    ],
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
    ],
  };

  constructor(private formBuilder: FormBuilder,
              private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router) {
    this.states = [
      {label: 'آذربایجان شرقی', value: '0'},
      {label: 'آذربایجان غربی', value: '1'},
      {label: 'اردبیل', value: '2'},
      {label: 'اصفهان', value: '3'},
      {label: 'البرز', value: '4'},
      {label: 'ایلام', value: '5'},
      {label: 'بوشهر', value: '6'},
      {label: 'تهران', value: '7'},
      {label: 'چهارمحال و بختیاری', value: '8'},
      {label: 'خراسان جنوبی', value: '9'},
      {label: 'خراسان رضوی', value: '10'},
      {label: 'خراسان شمالی', value: '11'},
      {label: 'خوزستان', value: '12'},
      {label: 'زنجان', value: '13'},
      {label: 'سمنان', value: '14'},
      {label: 'سیستان و بلوچستان', value: '15'},
      {label: 'فارس', value: '16'},
      {label: 'قزوین', value: '17'},
      {label: 'قم', value: '18'},
      {label: 'گلستان', value: '19'},
      {label: 'گیلان', value: '20'},
      {label: 'لرستان', value: '21'},
      {label: 'مازنداران', value: '22'},
      {label: 'مرکزی', value: '23'},
      {label: 'هرمزگان', value: '24'},
      {label: 'همدان', value: '25'},
      {label: 'کردستان', value: '26'},
      {label: 'کرمان', value: '27'},
      {label: 'کرمانشاه', value: '28'},
      {label: 'کهگیلویه و بویراحمد', value: '29'},
      {label: 'یزد', value: '30'},
    ];

    this.getCategories();

    this.typesCompany = [
      {label: 'سهامی عام', value: 'سهامی عام'},
      {label: 'سهامی خاص', value: 'سهامی خاص'},
      {label: 'مسولیت محدود', value: 'مسولیت محدود'},
      {label: 'تعاونی', value: 'تعاونی'}
    ];
  }

  ngOnInit(): void {
    this.getSellerFromStorage();

    this.createPersonalForm();
    this.createContactForm();
    this.createBussinessForm();
  }

  createPersonalForm(): void {
    this.personalForm = this.formBuilder.group({
      firstName: new FormControl(
        this.userData.firstName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      lastName: new FormControl(
        this.userData.lastName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      gender: new FormControl(
        this.userData.gender,
        [
          Validators.required
        ]
      ),
      idNumber: new FormControl(
        this.userData.idNumber,
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ),
      nationalCode: new FormControl(
        this.userData.nationalCode,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ),
      phone: new FormControl(
        this.userData.phone,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11)
        ]
      ),
      state: new FormControl(
        this.userData.state,
        [
          Validators.required
        ]
      ),
      city: new FormControl(
        this.userData.city,
        [
          Validators.required
        ]
      ),
      address: new FormControl(
        this.userData.address,
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      ),
      birthDay: new FormControl(
        this.userData.birthDay,
        [
          Validators.required
        ]
      ),
      imageNationalcard: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
    });
  }

  createContactForm(): void {
    this.contactForm = this.formBuilder.group({
      shopName: new FormControl(
        this.userData.shopName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      category: new FormControl(
        this.userData.category,
        [
          Validators.required
        ]
      ),
      shabaNumber: new FormControl(
        this.userData.shabaNumber,
        [
          Validators.required
        ]
      ),
      logo: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
    });
  }

  createBussinessForm(): void {
    this.businessForm = this.formBuilder.group({
      companyName: new FormControl(
        this.userData.companyName,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      signCompany: new FormControl(
        this.userData.signCompany,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      regNumCompany: new FormControl(
        this.userData.regNumCompany,
        [
          Validators.required
        ]
      ),
      economicCompany: new FormControl(
        this.userData.economicCompany,
        [
          Validators.required
        ]
      ),
      typeCompany: new FormControl(
        this.userData.typeCompany,
        [
          Validators.required
        ]
      ),
      imageSeller: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      imageCertificate: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      imageCompany: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      resume: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
    });
  }

  stateOnChange(code: string): void {
    this.cities = [];
    if (code === '1') {
      this.cities = [
        {label: '1', value: '0'},
        {label: '1', value: '1'},
        {label: '1', value: '2'}
      ];
    }
    if (code === '2') {
      this.cities = [
        {label: '2', value: '0'},
        {label: '2', value: '1'},
        {label: '2', value: '2'}
      ];
    }
  }

  submitPersonalForm(): void {
    const state = this.personalForm.controls.state.value;
    this.personalForm.controls.state.setValue(state.label);

    const city = this.personalForm.controls.city.value;
    this.personalForm.controls.city.setValue(city.label);

    this.sellerService.updateSeller(this.userData.id, this.personalForm.value).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.userData.id);
      }
      else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitContactForm(): void {

    const category = this.contactForm.controls.category.value;
    this.contactForm.controls.category.setValue(category._id);

    this.sellerService.updateSeller(this.userData.id, this.contactForm.value).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.userData.id);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  submitBusinessForm(): void {
    this.sellerService.updateSeller(this.userData.id, this.businessForm.value).subscribe((response) => {
      if (response.success === true) {
        this.getSeller(this.userData.id);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  getSeller(id: any): void{
    this.sellerService.getSeller(id).subscribe((response) => {
      if (response.success === true) {
        localStorage.setItem('user', JSON.stringify(response.data));

        this.getSellerFromStorage();

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getCategories(): any{
    this.sellerService.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getSellerFromStorage(): void{
    if (localStorage.getItem('user') !== null) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
    else{
      this.router.navigateByUrl('/seller/login');
    }
  }

  logoUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.contactForm.controls.logo.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود لوگو ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود لوگو ', detail: response.data});
      }
    });
  }

  imageSellerUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.businessForm.controls.imageSeller.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر فروشنده ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر فروشنده ', detail: response.data});
      }
    });
  }

  imageNationalcardUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.personalForm.controls.imageNationalcard.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر کارت ملی ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر کارت ملی ', detail: response.data});
      }
    });
  }

  imageCertificateUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.businessForm.controls.imageCertificate.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود گواهی ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود گواهی ', detail: response.data});
      }
    });
  }

  imageCompanyUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.businessForm.controls.imageCompany.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر فروشگاه ', detail: 'تصویر با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر فروشگاه ', detail: response.data});
      }
    });
  }

  resumeUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.businessForm.controls.resume.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود رزومه ', detail: 'فایل با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود رزومه ', detail: response.data});
      }
    });
  }

  isCompanyOnChange(): void{
    this.isCompany = !this.isCompany;
  }
}
