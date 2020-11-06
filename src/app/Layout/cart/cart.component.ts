import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {CartService} from "../../serviceCart/cart.service";
import {LayoutService} from "../layout.service";
import {UserService} from "../../Auth/user.service";
import {MessageService} from "primeng/api";

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
  cols: any[];
  items: any[];
  state: state[];
  city: City[];
  selectedCity: City;
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
  }
  formUser: FormGroup;
  userRegister = {
    mobile: '',
    password: ''
  };
  successLogin: boolean = true;
  public payment = {
    userID: '',
    mobile: '',
    price:'',
    date:'',
    time:''
  };
  valueCountProduct = [];
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(private authService: UserService, private _formBuilder: FormBuilder, private serviceCart: CartService, private servicelayout: LayoutService, private messageService: MessageService) {
    this.state = [
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
    this.city = [
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

  }

  ngOnInit(): void {
    // localStorage.removeItem("user");
    if (localStorage.getItem('user') !== null) {
      this.successLogin = false;
      this.getInfoUser();
    }

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
    this.items = this.serviceCart.getItems();
    var sumPrice = 0;
    for (var i = 0; i < this.items.length; i++) {

      this.valueCountProduct.push(this.items[i]['product'].number);

      sumPrice += (this.items[i]['product']['cartList'].price) * (this.items[i]['product'].number)

    }
    this.sumPrice = sumPrice;
  }

  onRegister() {
    this.servicelayout.updateUser(this.userInfologin['_id'], this.userInfo).subscribe((response) => {
      // console.log(response);
    });
    this.payment.userID=this.userInfologin['_id'];
    this.payment.mobile=this.userInfologin['mobile'];
    let data={
      product:JSON.parse(localStorage.getItem('cartList')),
      user:this.payment,
      price:this.sumPrice
    }
    this.servicelayout.onPayment(data).subscribe((response) => {
      let url = response['data'];
      document.location.href = url;
    });

  }

  getInfoUser() {
    // localStorage.removeItem("user");
    this.userInfologin = JSON.parse(localStorage.getItem('user'));
    let data = {
      mobile: this.userInfologin['mobile']
    }
    this.authService.onfindUser(data).subscribe((response) => {
      if (response['success'] === true) {
        localStorage.setItem('user', JSON.stringify(response['data']));

        this.userInfologin = JSON.parse(localStorage.getItem('user'));
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
    })

  }

  loginUser(): void {
    this.authService.onLogin(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.successLogin = false;
        localStorage.setItem('user', JSON.stringify(response['data']));
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
            localStorage.setItem('user', JSON.stringify(response['data']));
            this.getInfoUser();
          }
        })

        this.getInfoUser();
      } else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data']});
      }
    });
  }
  deleteCart(item:any){
    this.serviceCart.deleteItem(item);
    this.items = this.serviceCart.getItems();
  }
}
