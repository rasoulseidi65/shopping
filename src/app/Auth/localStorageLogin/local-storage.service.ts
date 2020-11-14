import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public userData: any;
  public userToken: any;
  public userJson: any;
  public userType: any;

  constructor() {

  }

  saveCurrentUser(data: any) {
    localStorage.setItem('currentUser', data);
  }

  getCurrentUser() {
    this.userData = localStorage.getItem('currentUser');

    if (this.userData !== undefined && this.userData !== []) {
      this.userJson = JSON.parse(this.userData);
      this.userType = this.userJson['type'];

      if (this.userJson !== undefined) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  removeCurrentUser() {
    // alert('del');
    localStorage.removeItem('currentUser');

  }
}
