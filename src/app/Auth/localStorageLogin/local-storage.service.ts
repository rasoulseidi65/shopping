import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public userData: any;
  public userToken: any;
  public userJson: any;

  constructor() {

  }
 saveCurrentUser(data: any){
   localStorage.setItem('currentUser', data);
 }
  getCurrentUser() {
    this.userData = localStorage.getItem('currentUser');
    this.userJson =  JSON.parse(this.userData);
    if (this.userJson != null) {
      // this.userJson = JSON.parse(this.userData);
      // this.userToken= this.userJson.token;
    return true;

    }
    else
    {
      return false;
    }
  }
  removeCurrentUser(){
    // alert('del');
    localStorage.removeItem('currentUser');

  }
}
