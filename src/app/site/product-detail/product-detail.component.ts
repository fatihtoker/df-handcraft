import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/shared/product-list/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  loading = false;
  id: number;
  routeSubscription: Subscription;
  aws = environment.aws;

  product: ProductModel;

  images = [];

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })

    this.loadItem();
  }

  loadItem() {
    this.loading = true;

    this.apiService.get('products/' + this.id).subscribe(
      (response) => {
        this.product = new ProductModel(response.data);
        this.loading = false;

        for (const image of this.product.images) {
          this.images.push({
            folder: image.folder,
            name: image.unique_name,
            selected: false
          });
        }
        this.images[0].selected = true;
      }, () => {
        this.loading = false;
      }
    )

  }
  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  getSelectedImage() {
    return this.images.find((el) => el.selected);
  }
  getImageSrc(image) {
    return 'https://' + this.aws.bucketName + '.' + this.aws.baseURL + '/' + image.folder + '/' + image.name;
  }

}
