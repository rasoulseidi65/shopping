import { Component, OnInit } from '@angular/core';
import {SellerService} from '../../seller.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-product-feature',
  templateUrl: './add-product-feature.component.html',
  styleUrls: ['./add-product-feature.component.css'],
  providers: [
    MessageService
  ]
})

export class AddProductFeatureComponent implements OnInit {

  showSelectedFeatures: any[] = [];
  features: any[];
  selectedFeature: any;
  values: any[] = [];
  selectedValues: any[] = [];
  finalSelectedValues: any[] = [];

  constructor(private sellerService: SellerService,
              private messageService: MessageService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(): any {
    this.sellerService.getFeatures().subscribe((response) => {
      if (response.success === true) {
        this.features = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getFeatureValues(event): void {
    this.values = this.features.find(x => x.id === event.value._id).FeaturesValue;
  }

  addSelectedValues(event: any): void {
    if (event.value !== null) {
      this.finalSelectedValues = [];
      this.finalSelectedValues.push(...event.value);

      this.showSelectedFeatures = [];
      event.value.forEach(item => {
        const parent = this.features.find(x => x.id === item.featuresID).titleFarsi;

        this.showSelectedFeatures.push(
          {
            featureId: item.featureID,
            title: parent,
            valueId: item.id,
            value: item.value
          }
        );
      });
    }
  }

  submitForm(): void {
    let productFeature: any;

    this.finalSelectedValues.forEach(item => {
      productFeature = {
        productID: this.config.data.id,
        featuresID: item._id,
        valueID: item.id
      };
    });

    this.sellerService.addProductFeature(productFeature).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' ثبت محصول ', detail: 'محصول با موفقیت ثبت شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });

  }

}
