import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: HttpHeaders;
  loginUrl: string;
  constructor(private api: ApiService) {
    this.headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.loginUrl = 'admin/login_check';
  }
  public authenticate(credentials: any = {}) {
    if (credentials) {
      this.api.post(this.loginUrl, JSON.stringify(credentials), '').subscribe(response => {
        console.log(response);
        //localStorage.setItem('token', )
      });
    }
  }
}
