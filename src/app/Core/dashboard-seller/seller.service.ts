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

  addProduct(id: any, data: any): any{
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/product/' + id, data);
  }

  getFeatures(): any{
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/indexFeature');
  }

  uploadFile(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/image', data);
  }

  uploadFiles(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/multipleimage', data);
  }
}
