import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserService} from "../User.service";
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  public formGroup: FormGroup;
  cities: City[];
  user = {
    id: '',
    firstName: '',
    lastName: '',
    nationalCode:'',
    mobile: '',
    phone: '',
    state: '',
    city: '',
    postalCode: '',
    plaque: '',
    address: ''
  };
  getInfoUser: any;

  constructor(private localStorage:LocalStorageService, private  fb: FormBuilder, private messageService: MessageService, private userService: UserService) {


    this.cities = [
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
    // if (this.localStorage.getCurrentUser() === true) {
    if (this.localStorage.getCurrentUser() != null) {
      this.getInfoUser = this.localStorage.userJson;
      let data = {
        mobile: this.getInfoUser['mobile']
      }
      this.userService.onfindUser(data).subscribe((response) => {
        if (response['success'] === true) {
          this.user.firstName=response['data']['firstName'];
          this.user.lastName=response['data']['lastName'];
          this.user.mobile=response['data']['mobile'];
          this.user.phone=response['data']['phone'];
          this.user.state=response['data']['state'];
          this.user.city=response['data']['city'];
          this.user.postalCode=response['data']['postalCode'];
          this.user.plaque=response['data']['plaque'];
          this.user.address=response['data']['address'];
        }
      })
    }

    this.formGroup = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      nationalCode: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      plaque: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

  }


}
