import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../Auth/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers: [MessageService]
})
export class LoginRegisterComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  mobileRegix = /^0?9[123]\d{8}$/;
  loginErrorMessages = {
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

  registerErrorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' }
    ],
    password: [
      { type: 'required', message: 'کلمه عبور را وارد کنید.' },
      { type: 'minlength', message: 'کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.' }
    ],
    confirmPassword: [
      { type: 'required', message: 'تکرار کلمه عبور را وارد کنید.' },
      { type: 'minlength', message: 'تکرار کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.' }
    ],
  };
  constructor(private formBuilder: FormBuilder, private authService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group(
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
            Validators.required,
            Validators.minLength(6)
          ])
        ),
        confirmPassword: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])
        ),
      }, {
        validators: this.password.bind(this)
      });

    this.loginForm = this.formBuilder.group(
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

  password(formGroup: FormGroup): any {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  login(): void {
    this.authService.onLogin(this.loginForm).subscribe((response) => {
      if (response['success'] === true) {
        localStorage.setItem('user', JSON.stringify( response['data'] ));
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data']});
      }
    });
  }

  register(): void {
    this.authService.onRegister(this.registerForm).subscribe((response) => {
      if (response['success'] === true) {
        localStorage.setItem('user', JSON.stringify(this.registerForm));
      }
      else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data'] });
      }
    });
  }

}
