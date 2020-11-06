import {Component, OnInit} from '@angular/core';
import {UserService} from "../User.service";

@Component({
  selector: 'app-payment-user',
  templateUrl: './payment-user.component.html',
  styleUrls: ['./payment-user.component.css']
})
export class PaymentUserComponent implements OnInit {
  payment: any[] = [];
  cols: any[];
  user:any;
  userID:string;
  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userID = JSON.parse(localStorage.getItem('user'));
      let data = {
        userID: this.userID['id']
      }
      this.userService.getPayment(data).subscribe((response) => {
        if (response['success'] === true) {
          this.payment = response['data'];
        }
      })
    }
  }

}
