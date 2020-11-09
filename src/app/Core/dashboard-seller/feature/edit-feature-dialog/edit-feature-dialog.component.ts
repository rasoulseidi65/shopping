import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-feature-dialog',
  templateUrl: './edit-feature-dialog.component.html',
  styleUrls: ['./edit-feature-dialog.component.css']
})
export class EditFeatureDialogComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      titleFarsi: new FormControl(
        this.config.data.titleFarsi,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      titleLatin: new FormControl(
        this.config.data.titleLatin,
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
