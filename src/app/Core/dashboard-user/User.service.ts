import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http:HttpClient) { }

  onDisplayBasket(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/user/basketList',data);
  }
  getPayment(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/user/getPayment',data);
  }
  onfindUser(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/user', data);
  }
}
