
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  headers={
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
  constructor(private http: HttpClient) {
  }

  showGift(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/showGift');
  }

  showProduct(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/product');
  }

  registerUser(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/register', data);
  }

  registerSeller(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/registerSeller', data);
  }

  loginSeller(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/loginSeller', data);
  }

  updateUser(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/user/updateUser/' + id, data);
  }

  onPayment(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/payment', data).pipe(map(result => result));
  }

  checkStatePayment(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/checkStatePayment', data).pipe(map(result => result));
  }

  hottest(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/hottest');
  }

  Bestselling(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/Bestselling');
  }

  relatedProducts(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/relatedProducts', data);
  }

  allProduct(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/allProduct');
  }

  findProductID(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/findProductByID', data);
  }

  registerBasket(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/basket', data);
  }

  regSmsNewsletter(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/SmsNewsletter', data);
  }

  regEmailNewsletter(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/EmailNewsletter', data);
  }

  getCategories(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/category');
  }

  getSubCategories(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/subCategory/' + id);
  }

  getSubSubCategories(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/subsubCategory/' + id);
  }

  getWishList(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/allWishlist', data);
  }

  addWishList(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/addWishList', data);
  }

  deleteWishList(id: any): any {
    return this.http.delete('http://194.5.175.25:3005/api/v1/user/deleteWishList/' + id);
  }

  getTokenPost(data:any) {

    const headers = {'content-type': 'application/x-www-form-urlencoded'}
    return this.http.post('http://svc.ebazaar-post.ir/RestApi/token', data, {'headers': headers});
  }
  listOstan(data:any,token:any){
    console.log(token)
    const headers = {
      'content-type': 'application/json',
      'Authorization':'Bearer '+token
    }
    return this.http.post('http://svc.ebazaar-post.ir/RestApi/api/v0/BaseInfo/Province', data, {'headers': headers});

  }

  getWishListCount(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/user/countWishlist/' + id);
  }

  addProductComment(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/addComment', data);
  }

  getProductComments(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/user/allCommentForProduct/' + id);
  }

  getProductCommentsCount(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/user/countComment/' + id);
  }
}
