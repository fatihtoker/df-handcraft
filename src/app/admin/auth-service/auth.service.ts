import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../shared/api/api.service';
import {ReplaySubject, Subject} from 'rxjs';
import {DataService} from '../../shared/data-service/data.service';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dfAdmin: any;
  headers: HttpHeaders;
  private errorSource: Subject<any>;
  constructor(private api: ApiService, private http: HttpClient, private dataService: DataService) {
    this.dfAdmin = environment.dfAdmin;
    this.headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.errorSource = new ReplaySubject<any>(1);
  }
  get error$() {
    return this.errorSource.asObservable();
  }
  authenticate(credentials: any = {}) {
    const loginUrl = 'admin/login_check';
    if (credentials) {
      return this.http.post(`${this.dfAdmin.baseURL}/${this.dfAdmin.loginUrl}`, JSON.stringify(credentials), {headers: this.headers});
    }
  }
  unAuthenticate() {
    localStorage.clear();
    window.location.href = '/';
  }
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const checkPath = 'admin/';
    const checkHeaders = this.headers.append(
      'Authorization', 'Bearer ' + token,
    );
    if (token) {
      return this.http.get(`${this.dfAdmin.baseURL}/`, {headers: checkHeaders}).toPromise()
        .catch(err => {
          this.errorSource.next(err);
        });
    }
    return false;
  }
}
