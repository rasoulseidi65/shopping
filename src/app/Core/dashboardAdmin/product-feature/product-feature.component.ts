import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AdminserviceService} from '../adminservice.service';
import {MessageService} from 'primeng/api';
interface feature {
  titleFarsi: string,
  _id: string
}

interface featureValue {
  value: string,
  featuresID: string,
  _id: string
}
@Component({
  selector: 'app-product-feature',
  templateUrl: './product-feature.component.html',
  styleUrls: ['./product-feature.component.css'],
  providers: [MessageService]

})

export class ProductFeatureComponent implements OnInit {
  public formGroupFeature: FormGroup;
  public formGroupFeatureValue: FormGroup;
  Feature: feature[];
  FeatureValue: featureValue[];
  feature = {
    titleFarsi: '',
    titleLatin: '',
  };
  featureValue = {
    titleFarsi: '',
    value: '',
    featuresID: '',

  };
  constructor(private fb:FormBuilder, private service: AdminserviceService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.onDisplayFeature();
    this.formGroupFeatureValue = this.fb.group({
      value: new FormControl(['']),
      featureID: new FormControl(['']),
    });
    this.formGroupFeature = this.fb.group({
      titleFarsi: new FormControl(['']),
      titleLatin: new FormControl(['']),
    });
  }
  onRegisterFeature() {
    this.service.onRegisterFeature(this.feature).subscribe((response) => {
      if (response['success'] == true) {
        this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'ویژگی با موفقیت ثبت شد'});
        this.onDisplayFeature();
      }
    });
  }
  onDisplayFeature() {
    this.service.onDisplayFeature().subscribe((response) => {
      if (response['success'] === true) {
        this.Feature = response['data'];
      }
    });
  }

  onRegisterFeatureValue() {
    this.service.onRegisterFeatureValue(this.featureValue).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'مقدار ویژگی با موفقیت ثبت شد'});
      }
    });
  }
}
