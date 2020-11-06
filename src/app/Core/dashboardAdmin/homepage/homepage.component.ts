import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdminserviceService} from "../adminservice.service";
import {SliderModel} from "../Slider.model";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService]
})
export class HomepageComponent implements OnInit {
  public formGroupSlider: FormGroup;
  slider = {
    title: '',
    caption: '',
    imageurl: ''
  }
  cols: any[];
  sliderModel:SliderModel[];
  constructor(private  fb: FormBuilder, private service: AdminserviceService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.formGroupSlider = this.fb.group({
      title: new FormControl(['']),
      caption: new FormControl(['']),

    });
    this.service.onDisplaySlider().subscribe((response) => {
      if (response['success'] === true) {
        this.sliderModel = response['data'];
        console.log( response['data'])
      }
    })
  }

  onUpload(event) {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('image', event.files[i], event.files[i]['name']);
    }
    this.service.uploadFile(formData).subscribe((response) => {
      if (response['success'] === true) {
        this.slider.imageurl = response['imagePath'];
      } else {
        console.log(response);
      }
    });
  }

  onRegisterSlider() {
    this.service.onRegisterSlider(this.slider).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'اسلایدر با موفقیت ثبت شد'});
      }
    })
  }

}
