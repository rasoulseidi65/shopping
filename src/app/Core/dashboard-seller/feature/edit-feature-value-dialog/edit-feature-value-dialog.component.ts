import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-feature-value-dialog',
  templateUrl: './edit-feature-value-dialog.component.html',
  styleUrls: ['./edit-feature-value-dialog.component.css']
})
export class EditFeatureValueDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    value: [
      {type: 'required', message: 'مقدار ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'مقدار ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      value: new FormControl(
        this.config.data.value,
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
