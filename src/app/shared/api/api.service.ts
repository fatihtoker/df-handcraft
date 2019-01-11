import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ReplaySubject, Subject, throwError} from 'rxjs';
import {ApiModel} from './api.model';
import {catchError, map, timeout} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;
  private dfApi: any;

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

  constructor(private http: HttpClient) {
    this.dfApi = environment.dfApi;
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
    const statusCode: number = err.status;
    const message: string = err.error.message ? err.error.message : err.statusText;
    const errors: any = err.error.errors ? err.error.errors : [];
    console.log(err);

    const error: any = { statusCode: statusCode, message: message, errors: errors };

    this.errorSource.next(error);

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
  get(path: string, baseUrl: string = this.dfApi.baseURL, params: any = {}): Observable<any> {
    let urlParams: HttpParams = new HttpParams();
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        urlParams = urlParams.append(param, params[param]);
      }
    }
   // console.log(`${baseUrl}/${this.dfApi.version}/${path}`);
    return this.http.get(`${baseUrl}/${this.dfApi.version}/${path}`, { headers: this.headers, params: urlParams })
      .pipe(
        timeout(30000),
        catchError(err => this.handleError(err))
      );
  }
  post(path: string, data: any = {}, baseUrl: string = this.dfApi.baseURL): Observable<any> {
    return this.http.post(`${baseUrl}/${this.dfApi.version}/${path}`, JSON.stringify(data), { headers: this.headers })
      .pipe(
        timeout(30000),
        map(body => this.handleStatus(body)),
        catchError(err => this.handleError(err))
      );
  }
}
