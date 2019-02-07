import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../shared/api/api.service';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;
  status = false;

  constructor(private api: ApiService, private http: HttpClient) {
    this.headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
  authenticate(credentials: any = {}) {
    const loginUrl = 'admin/login_check';
    if (credentials) {
      return this.http.post(loginUrl, JSON.stringify(credentials), {headers: this.headers});
    }
  }
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const checkPath = 'admin/';
    const checkHeaders = this.headers.append(
      'Authorization', 'Bearer ' + token,
    );
    if (token) {
      this.http.get(checkPath, {headers: checkHeaders})
        .subscribe(response => {
          const code = response['code'];
        if (code === 200) {
          console.log('200 trueeeE');
          this.status = true;
        }
      }, err => {
          this.status = false;
      });
      return this.status;
    }
  }
}
