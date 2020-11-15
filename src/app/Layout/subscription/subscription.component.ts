import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../layout.service';
import {MessageModule} from 'primeng/message';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  mobile: 'sdfsdf';
  email: 'fsdf@u';
  displayError: boolean = false;
  mobileForm: FormGroup;
  emailForm: FormGroup;
textDialog:string;
  constructor(private service: LayoutService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      mobile: new FormControl('', Validators.required)
    });
    this.emailForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }


  regEmailNewsletter(email:any) {
    let data = {
      email: this.email
    };
    this.displayError = false;
    if (this.email!==undefined) {
      this.service.regEmailNewsletter(data).subscribe((response) => {
        if (response['success'] === true) {
          this.displayError = true;
          this.textDialog='عضویت در خبرنامه با موفقیت ثبت شد'
        } else {
          this.displayError = false;
        }
      });
    } else {
      this.displayError = true;
      this.textDialog='ایمیل را وارد نماید'
    }
  }

  regSmsNewsletter() {
    let data = {
      mobile: this.mobile
    };
    this.displayError = false;
    if (this.mobile!==undefined) {
      this.service.regSmsNewsletter(data).subscribe((response) => {
        console.log(response);
        if (response['success'] === true) {
          this.displayError = true;
          this.textDialog='عضویت در خبرنامه با موفقیت ثبت شد'
        } else {

          this.displayError = true;

        }
      });
    }
    else {
      this.displayError = true;
      this.textDialog='شماره همراه را وارد نماید'
    }

  }
}
