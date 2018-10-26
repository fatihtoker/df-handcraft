import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: Observable<any[]>;
  data: any;
  constructor(private db: AngularFirestore) {
    this.products = db.collection('products').valueChanges();
    this.products.subscribe(data => {
      console.log(data);
    });
  }
}
