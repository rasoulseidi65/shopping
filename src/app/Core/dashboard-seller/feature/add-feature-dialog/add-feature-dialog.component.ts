import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-feature-dialog',
  templateUrl: './add-feature-dialog.component.html',
  styleUrls: ['./add-feature-dialog.component.css']
})
export class AddFeatureDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    titleFarsi: [
      {type: 'required', message: 'عنوان فارسی ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان فارسی ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    titleLatin: [
      {type: 'required', message: 'عنوان انگلیسی ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان انگلیسی ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      titleFarsi: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      titleLatin: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      )
    });
  }

  submitForm(): void {
    console.log('done');
  }
}
