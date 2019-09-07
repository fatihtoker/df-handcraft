import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSource$: BehaviorSubject<any>;
  menuSource$: BehaviorSubject<any>;

  constructor() {
    this.dataSource$ = new BehaviorSubject<any>(null);
    this.menuSource$ = new BehaviorSubject<any>(null);
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
  getMenuObservable() {
    return this.menuSource$.asObservable();
  }
  updateMenu (data: any) {
    this.menuSource$.next(data);
  }
  getMenu() {
    return this.menuSource$.getValue();
  }
}
