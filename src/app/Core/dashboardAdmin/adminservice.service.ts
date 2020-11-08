import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private  http:HttpClient) { }
  uploadFile(image:any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/image', image);
  }
  multipleUploadFile(image:any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/multipleimage', image);
  }
  onRegisterProduct(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/product', data);
  }
  onDisplayProduct(){
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/product');
  }
  onRegisterComapny(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/seller/register', data);
  }
  onRegisterSlider(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/slider', data);
  }
  onDisplaySlider(){
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/slider');
  }
  onRegisterCategory(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/category', data);
  }
  onDisplayCategory(){
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/category');
  }
  onDisplaySeller(){
    return this.http.get('http://194.5.175.25:3005/api/v1/seller/allseller');
  }
  onRegisterFeature(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/feature', data);
  }
  // productFeature
  onRegisterProductFeature(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/productFeature', data);
  }
  onRegisterFeatureValue(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/featureValue', data);
  }
  onDisplayFeature(){
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/indexFeature');
  }
  onDisplayFeatureValue(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/indexFeatureValue',data);
  }
}
