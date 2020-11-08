import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) {}

  updateSeller(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/seller/updateSeller/' + id, data);
  }

  getSeller(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/showSeller/' + id);
  }

  getCategories(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/category');
  }

  getProducts(id: any): any{
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/products/' + id);
  }

  addProduct(data: any): any{
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/product', data);
  }

  uploadFile(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/image', data);
  }

}
