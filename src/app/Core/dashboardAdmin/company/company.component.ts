import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AdminserviceService} from "../adminservice.service";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [MessageService]
})
export class CompanyComponent implements OnInit {
  public formGroup: FormGroup;
  company = {
    name: '',
    mobile: '',
    address: '',
    password: '',
    image: ''
  };

  constructor(private  fb: FormBuilder, private service: AdminserviceService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl(['']),
      password: new FormControl(['']),
      mobile: new FormControl(['']),
      address: new FormControl(['']),
      image: new FormControl(['']),
    });
  }
  onUpload(event) {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('image', event.files[i], event.files[i]['name']);
    }
    this.service.uploadFile(formData).subscribe((response) => {
      if (response['success'] === true) {
        this.company.image = response['imagePath'];
      } else {
        console.log(response);
      }
    });
  }
  onRegisterCompany(){
this.service.onRegisterComapny(this.company).subscribe((response)=>{
  console.log(response)
  if(response['success']===true){
    alert('ok')
  }
})
  }
}
