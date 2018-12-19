import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSource$: BehaviorSubject<any>;

  constructor() {
    this.dataSource$ = new BehaviorSubject<any>(null);
  }
  getDataObservable() {
    return this.dataSource$.asObservable();
  }
  getData () {
    return this.dataSource$.getValue();
  }
  updateData (data: any) {
    this.dataSource$.next(data);
  }
}
