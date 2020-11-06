import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) {

  }
  showProduct() {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/product');
  }
  registerUser(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/register', data);
  }
  registerSeller(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/registerSeller', data);
  }
  loginSeller(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/loginSeller', data);
  }
  updateUser(id: any, data: any) {
    return this.http.put('http://194.5.175.25:3005/api/v1/user/updateUser/' + id, data);
  }
  onPayment(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/payment', data).pipe(map(result => result));
  }
  checkStatePayment(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/checkStatePayment', data).pipe(map(result => result));
  }
  hottest() {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/hottest');

  }
  Bestselling() {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/Bestselling');
  }
  relatedProducts(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/relatedProducts', data);
  }
  allProduct() {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allProduct');
  }
  findProductID(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/findProductByID', data);

  }
  registerBasket(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/basket', data);
  }

  regSmsNewsletter(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/SmsNewsletter', data);
  }
  regEmailNewsletter(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/EmailNewsletter', data);
  }
}
