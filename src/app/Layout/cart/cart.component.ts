import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {CartService} from '../../serviceCart/cart.service';
import {LayoutService} from '../layout.service';
import {UserService} from '../../Auth/user.service';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';

interface state {
  name: string,
  code: string
}

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  states: any[] = [];
  selectedState: any;
  cities: any[] = [];
  selectedCity: any;
  cols: any[];
  items: any[];
  state: state[];
  city: City[];
  display: boolean = true;

  formGroup: FormGroup;
  sumPrice = 0;
  userInfo = {
    id: '',
    firstName: '',
    lastName: '',
    mobile: '',
    phone: '',
    state: '',
    city: '',
    postalCode: '',
    plaque: '',
    address: ''
  };
  userInfologin: any[];
  postInfo = {
    pricePost: '570000'
  };
  formUser: FormGroup;
  userRegister = {
    mobile: '',
    password: ''
  };
  successLogin: boolean = true;
  public payment = {
    userID: '',
    mobile: '',
    price: '',
    date: '',
    time: ''
  };
  xx: string;
  valueCountProduct = [];

  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(private authService: UserService,
              private _formBuilder: FormBuilder,
              private serviceCart: CartService,
              private servicelayout: LayoutService,
              private messageService: MessageService,
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



  }

  ngOnInit(): void {

    this.formUser = this._formBuilder.group({
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          image: new FormControl(['']),
        }),
        this._formBuilder.group({
          image: new FormControl('', Validators.required),
        }),
        this._formBuilder.group({
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          mobile: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          postalCode: new FormControl('', Validators.required),
          plaque: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
        }),
        this._formBuilder.group({
          pricePost: new FormControl(''),

        }),
        this._formBuilder.group({
          offerPercent: new FormControl(''),

        }),
        this._formBuilder.group({
          uploadFile: ['']
        }),
      ])
    });
    this.getInfoUser();
    this.refreshCart();
  }

  stateOnChange(code: any): void {
    this.userInfo.state=code.value['label'];
    this.cities = [];
    switch (code.value['value']) {
      case '1': {
        this.cities = [{value: '1', label: 'آذرشهر'}, {value: '2', label: 'اسکو'}, {value: '3', label: 'اهر'}, {
          value: '4',
          label: 'بستان آباد'
        }, {value: '5', label: 'بناب'}, {value: '6', label: 'تبریز'}, {value: '7', label: 'جلفا'}, {
          value: '8',
          label: 'چار اویماق'
        }, {value: '9', label: 'سراب'}, {value: '10', label: 'شبستر'}, {value: '11', label: 'عجب شیر'}, {
          value: '12',
          label: 'مراغه'
        }, {value: '13', label: 'مرند'}, {value: '14', label: 'ملکان'}, {value: '15', label: 'میانه'}, {
          value: '16',
          label: 'هریس'
        }, {value: '17', label: 'هشترود'}, {value: '18', label: 'ورزقان'}, {value: '19', label: 'کلیبر'}, {
          value: '20',
          label: 'خدا آفرین'
        }];
        break;
      }
      case '2': {
        this.cities = [{value: '21', label: 'ارومیه'}, {value: '22', label: 'اشنویه'}, {value: '23', label: 'بوکان'}, {
          value: '24',
          label: 'پیرانشهر'
        }, {value: '25', label: 'تکاب'}, {value: '26', label: 'چالدران'}, {value: '27', label: 'خوی'}, {
          value: '28',
          label: 'سردشت'
        }, {value: '29', label: 'سلماس'}, {value: '30', label: 'شاهین دژ'}, {value: '31', label: 'ماکو'}, {
          value: '32',
          label: 'مهاباد'
        }, {value: '33', label: 'میاندوآب'}, {value: '34', label: 'نقده'}, {value: '35', label: 'شوط'}, {
          value: '36',
          label: 'پلدشت'
        }, {value: '37', label: 'چابیاره'}];
        break;
      }
      case '3': {
        this.cities = [{value: '38', label: 'اردبیل'}, {value: '39', label: 'پیله سوار'}, {value: '40', label: 'پارس آباد'}, {
          value: '41',
          label: 'خلخال'
        }, {value: '42', label: 'گرمی'}, {value: '43', label: 'مشکین شهر'}, {value: '44', label: 'نمین'}, {
          value: '45',
          label: 'نیر'
        }, {value: '46', label: 'کوثر'}, {value: '47', label: 'سرعین'}];
        break;
      }
      case '4': {
        this.cities = [{value: '48', label: 'آران و بیدگل'}, {value: '49', label: 'اردستان'}, {value: '50', label: 'اصفهان'}, {
          value: '51',
          label: 'برخوار'
        }, {value: '52', label: 'تیران و کرون'}, {value: '53', label: 'چادگان'}, {value: '54', label: 'خمینی شهر'}, {
          value: '55',
          label: 'خوانسار'
        }, {value: '56', label: 'سمیرم'}, {value: '57', label: 'دهاقان'}, {value: '58', label: 'شاهین شهر ومیمه'}, {
          value: '59',
          label: 'شهرضا'
        }, {value: '60', label: 'فریدن'}, {value: '61', label: 'فریدون شهر'}, {value: '62', label: 'فلاورجان'}, {
          value: '63',
          label: 'گلپایگان'
        }, {value: '64', label: 'لنجان'}, {value: '65', label: 'مبارکه'}, {value: '66', label: 'نائین'}, {
          value: '67',
          label: 'نجف آباد'
        }, {value: '68', label: 'نطنز'}, {value: '69', label: 'کاشان'}, {value: '70', label: 'خور و بیابانک'}, {
          value: '71',
          label: 'بویین میاندشت'
        }];
        break;
      }
      case '5': {
        this.cities = [{value: '72', label: 'آبدانان'}, {value: '73', label: 'ایلام'}, {value: '74', label: 'ایوان'}, {
          value: '75',
          label: 'دره شهر'
        }, {value: '76', label: 'دهلران'}, {value: '77', label: 'چرداول'}, {value: '78', label: 'مهران'}, {
          value: '79',
          label: 'ملکشاهی'
        }, {value: '80', label: 'بدره'}, {value: '81', label: 'سیروان'}];
        break;
      }
      case '6': {
        this.cities = [{value: '82', label: 'بوشهر'}, {value: '83', label: 'تنگستان'}, {value: '84', label: 'جم'}, {
          value: '85',
          label: 'دشتستان'
        }, {value: '86', label: 'دشتی'}, {value: '87', label: 'دیر'}, {value: '88', label: 'دیلم'}, {
          value: '89',
          label: 'گناوه'
        }, {value: '90', label: 'کنگان'}];
        break;
      }
      case '7': {
        this.cities = [{value: '91', label: 'اسلامشهر'}, {value: '92', label: 'پاکدشت'}, {value: '93', label: 'تهران'}, {
          value: '94',
          label: 'دماوند'
        }, {value: '95', label: 'رباط کریم'}, {value: '96', label: 'شمیرانات'}, {value: '97', label: 'ری'}, {
          value: '98',
          label: 'شهریار'
        }, {value: '99', label: 'فیروزکوه'}, {value: '100', label: 'ورامین'}, {value: '101', label: 'بهارستان'}, {
          value: '102',
          label: 'ملارد'
        }, {value: '103', label: 'قرچک'}, {value: '104', label: 'پیشوا'}, {value: '105', label: 'قدس'}, {value: '106', label: 'پردیس'}];
        break;
      }
      case '8': {
        this.cities = [{value: '107', label: 'اردل'}, {value: '108', label: 'بروجن'}, {value: '109', label: 'شهرکرد'}, {
          value: '110',
          label: 'فارسان'
        }, {value: '111', label: 'لردگان'}, {value: '112', label: 'کوهرنگ'}, {value: '113', label: 'کیار'}, {
          value: '114',
          label: 'سامان'
        }, {value: '116', label: 'فرخ شهر'}, {value: '117', label: 'یلداچی'}, {value: '118', label: 'بن'}];
        break;
      }
      case '9': {
        this.cities = [{value: '119', label: 'بیرجند'}, {value: '120', label: 'درمیان'}, {value: '121', label: 'سرایان'}, {
          value: '122',
          label: 'سرپیشه'
        }, {value: '123', label: 'طبس'}, {value: '124', label: 'فردوس'}, {value: '125', label: 'قائنات'}, {
          value: '126',
          label: 'نهبندان'
        }, {value: '127', label: 'بشرویه'}, {value: '128', label: 'خوسف'}, {value: '129', label: 'زیرکوه'}, {
          value: '430',
          label: 'سربیشه'
        }];
        break;
      }
      case '10': {
        this.cities =
          [{value: '130', label: 'بردسکن'}, {value: '131', label: 'تایباد'}, {value: '132', label: 'تربت جام'}, {
            value: '133',
            label: 'تربت حیدریه'
          }, {value: '134', label: 'چناران'}, {value: '135', label: 'خلیل آباد'}, {value: '136', label: 'خواف'}, {
            value: '137',
            label: 'درگز'
          }, {value: '138', label: 'رشتخوار'}, {value: '139', label: 'سبزوار'}, {value: '140', label: 'سرخس'}, {
            value: '141',
            label: 'فریمان'
          }, {value: '142', label: 'قوچان'}, {value: '143', label: 'گناباد'}, {value: '144', label: 'مشهد مقدس'}, {
            value: '145',
            label: 'مه ولات'
          }, {value: '146', label: 'نیشابور'}, {value: '147', label: 'کاشمر'}, {value: '148', label: 'کلات'}, {
            value: '149',
            label: 'طرقبه شاندیز'
          }, {value: '150', label: 'چغنای'}, {value: '151', label: 'جوین'}, {value: '152', label: 'بجستان'}, {
            value: '153',
            label: 'زاوه'
          }, {value: '154', label: 'فیروزه'}, {value: '155', label: 'باخزر'}, {value: '429', label: 'اشخانه'}];
        break;
      }
      case '11': {
        this.cities = [{value: '156', label: 'اسفراین'}, {value: '157', label: 'بجنورد'}, {value: '158', label: 'جاجرم'}, {
          value: '159',
          label: 'شیروان'
        }, {value: '160', label: 'فاروج'}, {value: '161', label: 'مانه و سملقان'}, {value: '162', label: 'گرمه'}, {
          value: '163',
          label: 'راز و جرگلان'
        }];
        break;
      }
      case '12': {
        this.cities = [{value: '164', label: 'آبادان'}, {value: '165', label: 'امیدیه'}, {value: '166', label: 'اندیمشک'}, {
          value: '167',
          label: 'اهواز'
        }, {value: '168', label: 'ایذه'}, {value: '169', label: 'باغ ملک'}, {value: '170', label: 'بندر ماهشهر'}, {
          value: '171',
          label: 'بهبهان'
        }, {value: '172', label: 'خرمشهر'}, {value: '173', label: 'دزفول'}, {value: '174', label: 'دشت آزادگان(سوسنگرد)'}, {
          value: '175',
          label: 'رامشیر'
        }, {value: '176', label: 'رامهرمز'}, {value: '177', label: 'شادگان'}, {value: '178', label: 'شوش'}, {
          value: '179',
          label: 'شوشتر'
        }, {value: '180', label: 'گتوند'}, {value: '181', label: 'لالی'}, {value: '182', label: 'مسجد سلیمان'}, {
          value: '183',
          label: 'هندیجان'
        }, {value: '184', label: 'بندر امام خمینی'}, {value: '185', label: 'هفتکل'}, {value: '186', label: 'هویزه'}, {
          value: '187',
          label: 'اندیکا'
        }, {value: '188', label: 'باوی'}, {value: '189', label: 'حمیدیه'}, {value: '190', label: 'کارون'}];
        break;
      }
      case '13': {
        this.cities = [{value: '191', label: 'ابهر'}, {value: '192', label: 'ایجرود'}, {
          value: '193',
          label: 'خدابنده(قیدار)'
        }, {value: '194', label: 'خرم دره'}, {value: '195', label: 'زنجان'}, {value: '196', label: 'طارم'}, {
          value: '197',
          label: 'ماهنشان'
        }, {value: '198', label: 'سلطانیه'}];
        break;
      }
      case '14': {
        this.cities = [{value: '199', label: 'دامغان'}, {value: '200', label: 'سمنان'}, {value: '201', label: 'شاهرود'}, {
          value: '202',
          label: 'گرمسار'
        }, {value: '203', label: 'مهدی شهر'}, {value: '204', label: 'میامی'}, {value: '205', label: 'آرادان'}];
        break;
      }
      case '15': {
        this.cities = [{value: '206', label: 'ایرانشهر'}, {value: '207', label: 'چابهار'}, {value: '208', label: 'خاش'}, {
          value: '209',
          label: 'زابل'
        }, {value: '210', label: 'زاهدان'}, {value: '211', label: 'زهک'}, {value: '212', label: 'سراوان'}, {
          value: '213',
          label: 'سرباز'
        }, {value: '214', label: 'نیکشهر'}, {value: '215', label: 'کنارک'}, {value: '216', label: 'هیرمند'}, {
          value: '217',
          label: 'قصرقند'
        }, {value: '218', label: 'مهرستان'}, {value: '219', label: 'سیب و سوران'}, {value: '220', label: 'فنوج'}, {
          value: '221',
          label: 'نیمروز'
        }, {value: '222', label: 'میرجاوه'}, {value: '223', label: 'هامون'}];
        break;
      }
      case '16': {
        this.cities = [{value: '224', label: 'آباده'}, {value: '225', label: 'ارسنجان'}, {value: '226', label: 'استهبان'}, {
          value: '227',
          label: 'اقلید'
        }, {value: '228', label: 'بوانات'}, {value: '229', label: 'پاسارگاد'}, {value: '230', label: 'جهرم'}, {
          value: '231',
          label: 'خرم بید'
        }, {value: '232', label: 'خنج'}, {value: '233', label: 'داراب'}, {value: '234', label: 'زرین دشت'}, {
          value: '235',
          label: 'سپیدان'
        }, {value: '236', label: 'شیراز'}, {value: '237', label: 'فراشبند'}, {value: '238', label: 'فسا'}, {
          value: '239',
          label: 'فیروزآیاد'
        }, {value: '240', label: 'قیر و کارزین'}, {value: '241', label: 'لارستان'}, {value: '242', label: 'لامرد'}, {
          value: '243',
          label: 'مرودشت'
        }, {value: '244', label: 'مهر'}, {value: '245', label: 'ممستی'}, {value: '246', label: 'نی ریز'}, {
          value: '247',
          label: 'کازرون'
        }, {value: '248', label: 'سروستان'}, {value: '249', label: 'رستم'}, {value: '250', label: 'گراش'}, {
          value: '251',
          label: 'خرامه'
        }, {value: '252', label: 'کوار'}];
        break;
      }
      case '17': {
        this.cities = [{value: '255', label: 'آبیک'}, {value: '256', label: 'البرز'}, {value: '257', label: 'بویین زهرا'}, {
          value: '258',
          label: 'تاکستان'
        }, {value: '259', label: 'قزوین'}, {value: '260', label: 'آوج'}];
        break;
      }
      case '18': {
        this.cities = [{value: '261', label: 'قم'}];
        break;
      }
      case '19': {
        this.cities = [{value: '262', label: 'آزادشهر'}, {value: '263', label: 'گلستان - آزادشهر'}, {
          value: '264',
          label: 'آق قلا'
        }, {value: '265', label: 'بندر ترکمن'}, {value: '266', label: 'بندر گز'}, {value: '267', label: 'رامیان'}, {
          value: '268',
          label: 'علی آباد'
        }, {value: '269', label: 'گرگان'}, {value: '270', label: 'گنبد کاووس'}, {value: '271', label: 'مینو دشت'}, {
          value: '272',
          label: 'کرد کوی'
        }, {value: '273', label: 'کلاله'}, {value: '274', label: 'گالیکش'}, {value: '275', label: 'گمیشان'}, {
          value: '276',
          label: 'مراوه تپه'
        }];
        break;
      }
      case '20': {
        this.cities = [{value: '277', label: 'آستارا'}, {value: '278', label: 'آستانه اشرفیه'}, {
          value: '279',
          label: 'املش'
        }, {value: '280', label: 'بندر انزلی'}, {value: '281', label: 'تالش'}, {value: '282', label: 'رشت'}, {
          value: '283',
          label: 'رضوان شهر'
        }, {value: '284', label: 'رودبار'}, {value: '285', label: 'رودسر'}, {value: '286', label: 'سیاهکل'}, {
          value: '287',
          label: 'شفت'
        }, {value: '288', label: 'صومعه سرا'}, {value: '289', label: 'فومن'}, {value: '290', label: 'لاهیجان'}, {
          value: '291',
          label: 'لنگرود'
        }, {value: '292', label: 'ماسال'}];
        break;
      }
      case '21': {
        this.cities = [{value: '293', label: 'ازنا'}, {value: '294', label: 'الیگودرز'}, {value: '295', label: 'بروجرد'}, {
          value: '296',
          label: 'پل دختر'
        }, {value: '297', label: 'خرم آباد'}, {value: '298', label: 'دلقان(نورآباد)'}, {value: '299', label: 'دورود'}, {
          value: '300',
          label: 'سلسله(الشتر)'
        }, {value: '301', label: 'کوهدشت'}];
        break;
      }
      case '22': {
        this.cities = [{value: '302', label: 'آمل'}, {value: '303', label: 'بابل'}, {value: '304', label: 'بابلسر'}, {
          value: '305',
          label: 'بهشهر'
        }, {value: '306', label: 'تنکابن'}, {value: '307', label: 'جویبار'}, {value: '308', label: 'چالوس'}, {
          value: '309',
          label: 'رامسر'
        }, {value: '310', label: 'ساری'}, {value: '311', label: 'سوادکوه'}, {value: '312', label: 'عباس آباد'}, {
          value: '313',
          label: 'قائم شهر'
        }, {value: '314', label: 'گلوگاه'}, {value: '315', label: 'محمود آباد'}, {value: '316', label: 'نور'}, {
          value: '317',
          label: 'نوشهر'
        }, {value: '318', label: 'نکا'}, {value: '319', label: 'فریدونکنار'}, {value: '320', label: 'زیراب'}, {
          value: '321',
          label: 'سوادکوه شمالی'
        }, {value: '322', label: 'میاندرود'}, {value: '323', label: 'کلاردشت'}, {value: '324', label: 'سیمرغ'}];
        break;
      }
      case '23': {
        this.cities = [{value: '325', label: 'آشتیان'}, {value: '326', label: 'اراک'}, {value: '327', label: 'تفرش'}, {
          value: '328',
          label: 'خمین'
        }, {value: '329', label: 'دلیجان'}, {value: '330', label: 'زرندیه'}, {value: '331', label: 'ساوه'}, {
          value: '332',
          label: 'شازند'
        }, {value: '333', label: 'محلات'}, {value: '334', label: 'کمیجان'}, {value: '335', label: 'خنداب'}, {
          value: '336',
          label: 'فراهان'
        }];
        break;
      }
      case '24': {
        this.cities = [{value: '337', label: 'بستک'}, {value: '338', label: 'بندرعباس'}, {value: '339', label: 'بندر لنگه'}, {
          value: '340',
          label: 'پارسیان'
        }, {value: '341', label: 'جاسک'}, {value: '342', label: 'حاجی آباد'}, {value: '343', label: 'خمیر'}, {
          value: '344',
          label: 'رودان(دهبارز)'
        }, {value: '345', label: 'میناب'}, {value: '346', label: 'سیربک'}, {value: '347', label: 'قشم'}, {
          value: '348',
          label: 'ابوموسی'
        }, {value: '349', label: 'بشاگرد'}, {value: '350', label: 'کیش'}];
        break;
      }
      case '25': {
        this.cities = [{value: '351', label: 'اسد آباد'}, {value: '352', label: 'بهار'}, {value: '353', label: 'تویسرکان'}, {
          value: '354',
          label: 'رزن'
        }, {value: '355', label: 'فامتین'}, {value: '356', label: 'ملایر'}, {value: '357', label: 'نهاوند'}, {
          value: '358',
          label: 'همدان'
        }, {value: '359', label: 'کیودرآهنگ'}];
        break;
      }
      case '26': {
        this.cities = [{value: '360', label: 'بانه'}, {value: '361', label: 'بیجار'}, {value: '362', label: 'دیواندره'}, {
          value: '363',
          label: 'سروآباد'
        }, {value: '364', label: 'سقز'}, {value: '365', label: 'سنندج'}, {value: '366', label: 'قروه'}, {
          value: '367',
          label: 'مریوان'
        }, {value: '368', label: 'کامیاران'}, {value: '369', label: 'دهگلان'}];
        break;
      }
      case '27': {
        this.cities = [{value: '370', label: 'بافت'}, {value: '371', label: 'بردسیر(مشیز)'}, {value: '372', label: 'بم'}, {
          value: '373',
          label: 'راور'
        }, {value: '374', label: 'رفسنجان'}, {value: '375', label: 'زرند'}, {value: '376', label: 'سیرجان'}, {
          value: '377',
          label: 'شهر بابک'
        }, {value: '378', label: 'قهرج'}, {value: '379', label: 'کرمان'}, {value: '380', label: 'کوهبنان'}, {
          value: '381',
          label: 'انار'
        }, {value: '382', label: 'ریگان'}, {value: '383', label: 'رابر'}, {value: '420', label: 'جیرفت'}, {
          value: '421',
          label: 'رودبار جنوبی'
        }, {value: '422', label: 'عنبر آباد'}, {value: '423', label: 'منوجان'}, {value: '424', label: 'کهنوج'}, {
          value: '425',
          label: 'قلعه گنج'
        }];
        break;
      }
      case '28': {
        this.cities = [{value: '384', label: 'اسلام آباد غرب'}, {value: '385', label: 'پاوه'}, {
          value: '386',
          label: 'ثلاث باباجانی'
        }, {value: '387', label: 'جوانرود'}, {value: '388', label: 'دالاهو'}, {value: '389', label: 'روانسر'}, {
          value: '390',
          label: 'سرپل ذهاب'
        }, {value: '391', label: 'سنقر'}, {value: '392', label: 'صحنه'}, {value: '393', label: 'قصر شیرین'}, {
          value: '394',
          label: 'گیلانغرب'
        }, {value: '395', label: 'هرسین'}, {value: '396', label: 'کرمانشاه'}, {value: '397', label: 'کنگاور'}];
        break;
      }
      case '29': {
        this.cities = [{value: '398', label: 'بهمئی'}, {value: '399', label: 'دنا'}, {value: '400', label: 'گچساران'}, {
          value: '401',
          label: 'کهگیلویه'
        }, {value: '402', label: 'بویر احمد'}, {value: '403', label: 'باشت'}, {value: '427', label: 'یاسوج'}];
        break;
      }
      case '30': {
        this.cities = [{value: '404', label: 'ابرکوه'}, {value: '405', label: 'اردکان'}, {value: '406', label: 'بافق'}, {
          value: '407',
          label: 'تفت'
        }, {value: '408', label: 'خاتم'}, {value: '409', label: 'اشکذر'}, {value: '410', label: 'مهریز'}, {
          value: '411',
          label: 'میبد'
        }, {value: '412', label: 'یزد'}, {value: '413', label: 'بهاباد'}];
        break;
      }
      case '31': {
        this.cities = [{value: '414', label: 'ساوجبلاغ'}, {value: '415', label: 'کرج'}, {value: '416', label: 'نظرآباد'}, {
          value: '417',
          label: 'فردیس'
        }, {value: '418', label: 'اشتهارد'}, {value: '419', label: 'طالقان'}, {value: '426', label: 'هشتگرد'}];
        break;
      }
      default: {
        this.cities = [];
        break;
      }
    }
  }
  cityOnChange(code: any): void {
    this.userInfo.city=code.value['label'];

  }
  onRegister() {
    this.servicelayout.updateUser(this.userInfologin['_id'], this.userInfo).subscribe((response) => {
      // console.log(response);
    });
    this.payment.userID = this.userInfologin['_id'];
    this.payment.mobile = this.userInfologin['mobile'];
    let data = {
      product: JSON.parse(localStorage.getItem('cartList')),
      user: this.payment,
      price: this.sumPrice
    };
    this.servicelayout.onPayment(data).subscribe((response) => {
      let url = response['data'];
      document.location.href = url;
    });

  }

  getInfoUser() {
    console.log(this.localStorage.getCurrentUser())
    if (this.localStorage.getCurrentUser() === true) {
      this.successLogin = false;
      this.userInfologin = this.localStorage.userJson;
      let data = {
        mobile: this.userInfologin['mobile']
      };
      this.authService.onfindUser(data).subscribe((response) => {
        if (response['success'] === true) {
          this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
          this.userInfologin = this.localStorage.userJson;
          this.userInfo.id = this.userInfologin['_id'];
          this.userInfo.firstName = this.userInfologin['firstName'];
          this.userInfo.lastName = this.userInfologin['lastName'];
          this.userInfo.state = this.userInfologin['state'];
          this.userInfo.city = this.userInfologin['city'];
          this.userInfo.mobile = this.userInfologin['mobile'];
          this.userInfo.phone = this.userInfologin['phone'];
          this.userInfo.address = this.userInfologin['address'];
          this.userInfo.postalCode = this.userInfologin['postalCode'];
          this.userInfo.plaque = this.userInfologin['plaque'];
        }
      });
    }
  }

  loginUser(): void {
    this.authService.onLogin(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.successLogin = false;
        this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
        this.getInfoUser();
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data']});
      }
    });
  }

  registerUser(): void {
    this.authService.onRegister(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.successLogin = false;
        this.authService.onLogin(this.userRegister).subscribe((response) => {
          if (response['success'] === true) {
            this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
            this.getInfoUser();
          }
        });

        // this.getInfoUser();
      } else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data']});
      }
    });
  }

  deleteCart(item: any) {
    this.serviceCart.deleteItem(item);
    this.items = this.serviceCart.getItems();
    this.refreshCart();
  }

  refreshCart() {
    this.items = this.serviceCart.getItems();
    var sumPrice = 0;
    for (var i = 0; i < this.items.length; i++) {

      this.valueCountProduct.push(this.items[i]['product'].number);

      sumPrice += (this.items[i]['product']['cartList'].price) * (this.items[i]['product'].number);

    }
    this.sumPrice = sumPrice;
  }

  addCart(item: any, count: any) {
    if (count <= 0) {
      alert('موجود نمی باشد');
    } else {

      this.serviceCart.addToCart1(item['product'], count.value);
      this.refreshCart();

    }

  }

}
