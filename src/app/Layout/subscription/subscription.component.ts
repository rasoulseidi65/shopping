import { Component, OnInit } from '@angular/core';
import {LayoutService} from '../layout.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
    mobile: '';
    email: '';
  mobileRegix = /^0?9[123]\d{8}$/;
  ErrorMessages = {
    mobile: [
      {type: 'required', message: 'شماره موبایل را وارد کنید.'},
      {type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.'}
    ],
  }
  constructor(private service: LayoutService) { }

  ngOnInit(): void {
  }

  regEmailNewsletter() {
    let data={
      email:this.email
    }
    this.service.regEmailNewsletter(data).subscribe((response) => {
      if (response['success'] === true) {
        console.log(response['data']);
      }else {
        console.log('error');
      }
    })
  }

  regSmsNewsletter() {
    let data={
      mobile:this.mobile
    }
    this.service.regSmsNewsletter(data).subscribe((response) => {
      console.log(response)
      if (response['success'] === true) {
        console.log(response['data']);
      } else {
        console.log('error');
      }
    })
  }
}
