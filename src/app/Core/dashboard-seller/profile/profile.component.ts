import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {SellerModel} from '../SellerModel';

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
  years: SelectItem[];
  months: SelectItem[];
  days: SelectItem[];
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
    year: [
      {type: 'required', message: 'سال را انتخاب کنید.'}
    ],
    month: [
      {type: 'required', message: 'ماه را انتخاب کنید.'}
    ],
    day: [
      {type: 'required', message: 'روز را انتخاب کنید.'}
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
    imageNationalcard: [
      {type: 'required', message: 'تصویر کارت ملی را بارگذاری کنید.'}
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
              private messageService: MessageService) {
    this.states = [
      {name: 'آذربایجان شرقی', code: '0'},
      {name: 'آذربایجان غربی', code: '1'},
      {name: 'اردبیل', code: '2'},
      {name: 'اصفهان', code: '3'},
      {name: 'البرز', code: '4'},
      {name: 'ایلام', code: '5'},
      {name: 'بوشهر', code: '6'},
      {name: 'تهران', code: '7'},
      {name: 'چهارمحال و بختیاری', code: '8'},
      {name: 'خراسان جنوبی', code: '9'},
      {name: 'خراسان رضوی', code: '10'},
      {name: 'خراسان شمالی', code: '11'},
      {name: 'خوزستان', code: '12'},
      {name: 'زنجان', code: '13'},
      {name: 'سمنان', code: '14'},
      {name: 'سیستان و بلوچستان', code: '15'},
      {name: 'فارس', code: '16'},
      {name: 'قزوین', code: '17'},
      {name: 'قم', code: '18'},
      {name: 'گلستان', code: '19'},
      {name: 'گیلان', code: '20'},
      {name: 'لرستان', code: '21'},
      {name: 'مازنداران', code: '22'},
      {name: 'مرکزی', code: '23'},
      {name: 'هرمزگان', code: '24'},
      {name: 'همدان', code: '25'},
      {name: 'کردستان', code: '26'},
      {name: 'کرمان', code: '27'},
      {name: 'کرمانشاه', code: '28'},
      {name: 'کهگیلویه و بویراحمد', code: '29'},
      {name: 'یزد', code: '30'},
    ];

    this.categories = [
      {label: 'آذربایجان شرقی', value: '0'},
      {label: 'آذربایجان غربی', value: '1'},
    ];
    this.typesCompany = [
      {label: 'آذربایجان شرقی', value: '0'},
      {label: 'آذربایجان غربی', value: '1'},
    ];
    this.years = [];
    for (let i = 1310; i <= 1382; i++) {
      this.years.push({label: i.toString(), value: i});
    }

    this.months = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push({label: i.toString(), value: i});
    }

    this.days = [];
    for (let i = 1; i <= 31; i++) {
      this.days.push({label: i.toString(), value: i});
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
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
      year: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      month: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      day: new FormControl(
        null,
        [
          Validators.required
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
        this.userData.birthDay
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
      imageNationalcard: new FormControl(
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
        {name: '1', code: '0'},
        {name: '1', code: '1'},
        {name: '1', code: '2'}
      ];
    }
    if (code === '2') {
      this.cities = [
        {name: '2', code: '0'},
        {name: '2', code: '1'},
        {name: '2', code: '2'}
      ];
    }
  }
  monthOnChange(value: number): void {
    this.days = [];

    if (Number(value) <= 6) {
      for (let i = 1; i <= 31; i++) {
        this.days.push({label: i.toString(), value: i});
      }
    }
    else {
      for (let i = 1; i <= 30; i++) {
        this.days.push({label: i.toString(), value: i});
      }
    }
  }
  submitPersonalForm(): void {
    console.log(this.personalForm.controls.year.value);
    console.log(this.personalForm.controls.month.value);
    console.log(this.personalForm.controls.day.value);
    const birthday =
      this.personalForm.controls.year.value + '/' +
      this.personalForm.controls.month.value + '/' +
      this.personalForm.controls.day.value;

    console.log(birthday);
    this.personalForm.controls.birthDay.setValue(birthday);
    console.log(this.personalForm.controls);
  }
  submitContactForm(): void {
    console.log(this.contactForm.controls);
  }
  submitBusinessForm(): void {
    console.log(this.businessForm.controls);
  }
  logoUploader(event): void {
    console.log(event);
    console.log(event.files[0]);
    this.contactForm.controls.logo.setValue(event.files[0]);
    console.log(this.contactForm.controls);
  }
  imageSellerUploader(event): void {

  }
  imageNationalcardUploader(event): void {

  }
  imageCertificateUploader(event): void {

  }
  imageCompanyUploader(event): void {

  }
  resumeUploader(event): void {

  }
}
