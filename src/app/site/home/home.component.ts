import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: Observable<any[]>;
  data: any;
  constructor(private db: AngularFirestore) {
    this.products = db.collection('products').valueChanges();
    this.products.subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
