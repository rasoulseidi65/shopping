import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../layout.service';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  mobile: '';
  email: '';
  displayError:boolean = true;

  constructor(private service: LayoutService) {
  }

  ngOnInit(): void {
  }


  regEmailNewsletter() {
    let data = {
      email: this.email
    };
    this.service.regEmailNewsletter(data).subscribe((response) => {
      if (response['success'] === true) {
        console.log(response['data']);
        alert(response['data']);
      } else {
        console.log('error');
        this.displayError = true;
        alert(response['data']);
      }
    });
  }

  regSmsNewsletter() {
    let data = {
      mobile: this.mobile
    };
    this.service.regSmsNewsletter(data).subscribe((response) => {
      console.log(response);
      if (response['success'] === true) {
        console.log(response['data']);
        alert(response['data']);
      } else {
        console.log('error');
        this.displayError = true;
        alert(response['data']);
      }
    });
  }
}
