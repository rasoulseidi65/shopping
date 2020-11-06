import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LayoutService} from '../../layout.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
  providers: [MessageService]
})
export class SellerLoginComponent implements OnInit {

  form: FormGroup;
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' }
    ],
    password: [
      { type: 'required', message: 'کلمه عبور را وارد کنید.' }
    ]
  };

  constructor(private formBuilder: FormBuilder, private layoutService: LayoutService,
              private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        mobile: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern(this.mobileRegix)
          ])
        ),
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required
          ])
        )
      }
    );
  }

  login(): void {
    this.layoutService.loginSeller(this.form.value).subscribe((response) => {

      console.log(response);
      if (response['success'] === true) {
        localStorage.setItem('user', JSON.stringify( response['data'] ));
        this.router.navigateByUrl('/seller/profile');
      }
      else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data'], sticky: true});
      }
    });
  }

}
