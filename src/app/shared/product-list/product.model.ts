export class ProductModel {
  id: number;
  name?: string;
  category?: any;
  description?: string;
  onSale?: boolean;
  price?: number;
  images?: any;
  constructor(model: any) {
    if (model) {
      this.id = model.id;
      this.name = model.name;
      this.category = model.category;
      this.description = model.description;
      this.onSale = model.on_sale;
      this.price = model.price;
      this.images = model.images;
    }
  }
}
