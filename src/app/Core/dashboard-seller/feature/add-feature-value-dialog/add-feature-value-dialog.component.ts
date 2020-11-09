import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-feature-value-dialog',
  templateUrl: './add-feature-value-dialog.component.html',
  styleUrls: ['./add-feature-value-dialog.component.css']
})
export class AddFeatureValueDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    value: [
      {type: 'required', message: 'مقدار ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'مقدار ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      value: new FormControl(
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
