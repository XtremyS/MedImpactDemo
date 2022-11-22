import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AuthToken = localStorage.getItem('11510199114101116');

  //! MANAGING AUTH TOKEN IN LOCAL STORAGE
  SetLocalLoginValue(Token: any) {
    localStorage.setItem('11510199114101116', Token);
  }
  GetLocalLoginValue() {
    return this.AuthToken ? true : false;
  }
  RemoveLocalAuthToken() {
    localStorage.removeItem('11510199114101116');
    localStorage.removeItem('99105112104101114116101120116');
    localStorage.removeItem('ddr');
    localStorage.removeItem('ar');
    localStorage.removeItem('pdr');
  }
}
