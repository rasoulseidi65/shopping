import {Component, OnInit} from '@angular/core';
import {UserModel} from "../User.model";
import {UserService} from "../User.service";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  public UserModels: UserModel[] = [];
  cols: any[];
  userID:any;
  constructor(private userService: UserService) {
    this.cols = [
      {field: 'candidateNumber', header: 'شماره داوطلب'},
      {field: 'nationalCode', header: 'شماره ملی'},
      {field: 'firstName', header: 'نام'},
      {field: 'lastName', header: 'نام خانوادگی'},
      {field: 'fatherName', header: 'نام پدر'},
      {field: 'mobile', header: 'شماره همراه '},
      {field: 'birthday', header: 'تاریخ تولد  '},
      {field: 'serialNumber', header: 'سریال شناسنامه'}
    ];

  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userID = JSON.parse(localStorage.getItem('user'));
      let data = {
        userID: this.userID['id']
      }
      this.userService.onDisplayBasket(data).subscribe((response) => {
        console.log(response)
        if (response['success'] === true) {
          this.UserModels = response['data']
        }
      })
    }
  }

}
