import { Component } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Title} from '@angular/platform-browser';
import {switchMap} from 'rxjs/internal/operators';
import {DataService} from '../../shared/data-service/data.service';
import {ProductModel} from '../product-detail/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products$: Observable<ProductModel[]>;
  name$ = new BehaviorSubject<string>(null);
  data: any;
  constructor(private db: AngularFirestore, private title: Title, dataService: DataService ) {
    // this.products = db.collection('products').valueChanges();
    /*this.products.subscribe(data => {
      this.data = data;
    });*/

    this.products$ = this.name$.pipe(
      switchMap(query =>
        this.db.collection<ProductModel>('products', ref => ref.orderBy('name').startAt(query)).valueChanges()
      )
    );
    dataService.getDataObservable().subscribe(data => {
      this.name$.next(data);
      }
    );
    this.products$.subscribe(items => {
      console.log(items);
    }, err => {
      console.log(err);
    });

    this.title.setTitle('Anasayfa - DF Handcraft');
  }
}
