import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }

  getWishListCount(id: any): any{
    return this.http.get('http://194.5.175.25:3005/api/v1/user/countWishlist/' + id);
  }
}
