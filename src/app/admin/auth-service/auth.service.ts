import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {ApiService} from '../../shared/api/api.service';
import {ReplaySubject, Subject, Observable, throwError} from 'rxjs';
import {DataService} from '../../shared/data-service/data.service';
import {environment} from '../../../environments/environment';
import { timeout, catchError } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dfAdmin: any;
  headers: HttpHeaders;
  token: any;
  checkHeaders: any;
  private errorSource: Subject<any>;
  constructor(private api: ApiService, private http: HttpClient, private dataService: DataService) {
    this.dfAdmin = environment.dfAdmin;
    this.headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.token = localStorage.getItem('token');
    this.checkHeaders = this.headers.append(
      'Authorization', 'Bearer ' + this.token,
    );
    this.errorSource = new ReplaySubject<any>(1);
  }
  get error$() {
    return this.errorSource.asObservable();
  }
  authenticate(credentials: any = {}) {
    if (credentials) {
      return this.http.post(`${this.dfAdmin.baseURL}/${this.dfAdmin.loginURL}`, JSON.stringify(credentials), {headers: this.headers});
    }
  }
  unAuthenticate() {
    localStorage.clear();
    window.location.href = '/';
  }
  getCurrentUser(params: any = {}): Observable<any> {
    return this.api.get(this.dfAdmin.userInfoURL, this.dfAdmin.baseURL, params, false, this.checkHeaders);
  }
  getCheckHeaders() {
    return this.checkHeaders;
  }
  isAuthenticated() {
    if (this.token) {
      return this.http.get(`${this.dfAdmin.baseURL}/`, {headers: this.checkHeaders}).toPromise()
        .catch(err => {
          this.errorSource.next(err);
        });
    }
    return false;
  }
}
