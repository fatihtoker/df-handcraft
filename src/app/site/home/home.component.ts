import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: Observable<any[]>;
  data: any;
  constructor(private db: AngularFirestore, private title: Title ) {
    this.products = db.collection('products').valueChanges();
    this.products.subscribe(data => {
      this.data = data;
    });
    this.title.setTitle('Anasayfa - DF Handcraft');
  }
}
