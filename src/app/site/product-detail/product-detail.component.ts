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
  thumbnailVisibleCount = 3;
  thumbnailIndex = 0;
  phoneNumber = environment.phoneNumber;

  product: ProductModel;

  images = [];

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })

    this.loadItem();

  }
  setThumbnailVisible() {
    let index = 0;
    for (const image of this.images) {
      if (index <= this.thumbnailIndex + this.thumbnailVisibleCount - 1 && index >= this.thumbnailIndex) {
        image.thumbnailVisible = true;
      } else {
        image.thumbnailVisible = false;
      }
      index++;
    }
  }
  onPreviousClicked() {
    if (this.thumbnailIndex === 0) {
      return;
    }
    this.thumbnailIndex--;
    this.setThumbnailVisible();
  }
  onNextClicked() {
    if (this.thumbnailIndex === this.images.length - this.thumbnailVisibleCount) {
      return;
    }
    this.thumbnailIndex++;
    this.setThumbnailVisible();
  }
  onThumbnailImageClicked(image) {
    this.setSelectedImage(image);
  }
  setSelectedImage(image) {
    for (const item of this.images) {
      if (image.name === item.name) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    }
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
            selected: false,
            thumbnailVisible: false
          });
        }
        this.images[0].selected = true;
        this.setThumbnailVisible();
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
  onOrderClicked() {
    let whatsAppUrl = 'https://web.whatsapp.com/send?';
    whatsAppUrl += 'phone=' + this.phoneNumber + '&text=' + encodeURIComponent(window.location.href);

    window.open(whatsAppUrl, '_blank');
  }
}
