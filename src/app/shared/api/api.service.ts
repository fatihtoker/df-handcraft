import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ReplaySubject, Subject, throwError} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;
  private dfApi: any;
  private dfAdmin: any;
  private checkHeaders: any;
  private token: any;

  private successSource: Subject<any>;
  private infoSource: Subject<any>;
  private errorSource: Subject<any>;

  get success$() {
    return this.successSource.asObservable();
  }

  get info$() {
    return this.infoSource.asObservable();
  }

  get error$() {
    return this.errorSource.asObservable();
  }

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.dfApi = environment.dfApi;
    this.dfAdmin = environment.dfAdmin;
    this.successSource = new ReplaySubject<any>(1);
    this.infoSource = new ReplaySubject<any>(1);
    this.errorSource = new ReplaySubject<any>(1);

    this.headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private handleError(err: HttpErrorResponse) {
    const code: number = err.status;
    let message: string = err.error.message ? err.error.message : err.statusText;
    const errors: any = err.error.errors ? err.error.errors : [];

    const error: any = { code: code, message: message, errors: errors };

    if (code === 401) {
      window.location.href = 'admin-panel/giris/'
    }

    this.errorSource.next(error);
    if (!message || (environment.production && code === 500)) {
      message = 'Bir hata meydana geldi.';
    }
    this._snackBar.open(message, '', {
      duration: 1500
    });

    return throwError(error);
  }
  private handleStatus(body: any) {
    if (body.status === 'success') {
      this.successSource.next(body);
    } else if (body.status === 'info') {
      this.infoSource.next(body);
    }
    return body;
  }
  // TODO: Observable<ApiModel>
  get(path: string, baseUrl: string = this.dfApi.baseURL, params: any = {}, versioning = true, headers = this.headers): Observable<any> {
    let urlParams: HttpParams = new HttpParams();
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        urlParams = urlParams.append(param, params[param]);
      }
    }
    const version = versioning ? this.dfApi.version + '/' : '';
   // console.log(`${baseUrl}/${this.dfApi.version}/${path}`);
    return this.http.get(`${baseUrl}/${version}${path}`, { headers: headers, params: urlParams })
      .pipe(
        timeout(30000),
        catchError(err => this.handleError(err))
      );
  }
  getWithCredentials(path: string, baseUrl: string = this.dfAdmin.baseURL, params: any = {}, headers = this.headers): Observable<any> {
    this.token = localStorage.getItem('token');
    headers = headers.append(
      'Authorization', 'Bearer ' + this.token,
    );
    let urlParams: HttpParams = new HttpParams();
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        urlParams = urlParams.append(param, params[param]);
      }
    }
    return this.http.get(`${baseUrl}/${path}`, { headers: headers, params: urlParams })
      .pipe(
        timeout(30000),
        catchError(err => this.handleError(err))
      );
  }
  post(path: string, data: any = {}, baseUrl: string = this.dfApi.baseURL + '/' + this.dfApi.version,
       headers = this.headers): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/${path}`, JSON.stringify(data), { headers: headers })
      .pipe(
        timeout(30000),
        map(body => this.handleStatus(body)),
        catchError(err => this.handleError(err))
      );
  }
  postWithCredentials(path: string, data: any = {}, baseUrl: string = this.dfAdmin.baseURL, headers = this.headers): Observable<any> {
    this.token = localStorage.getItem('token');
    headers = headers.append(
      'Authorization', 'Bearer ' + this.token,
    );
    return this.http.post(`${baseUrl}/${path}`, JSON.stringify(data), { headers: headers })
      .pipe(
        timeout(30000),
        map(body => this.handleStatus(body)),
        catchError(err => this.handleError(err))
      );
  }
  postFileWithCredentials(path: string, params: any, baseUrl: string = this.dfAdmin.baseURL): Observable<any> {
    const formData: any = new FormData();

        for (const key of Object.keys(params)) {
            const param = params[key];

            if (param instanceof FileList) {

                if (param.length > 0) {
                    for (let i = 0; i < param.length; i++) {
                        formData.append(key + i, param[i], param[i].name, name);
                    }
                }
            } else {
                formData.append(key, params[key]);
            }
        }
        console.log('formData: ', formData)
    this.token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(`${baseUrl}/${path}`, formData, { headers: headers })
      .pipe(
        timeout(30000),
        map(body => this.handleStatus(body)),
        catchError(err => this.handleError(err))
      );
  }
}
