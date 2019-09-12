export class ProductModel {
  id: number;
  name?: string;
  category?: any;
  description?: string;
  onSale?: boolean;
  price?: number;
  imgUrl?: string;
  imgName?: string;
  constructor(model: any) {
    if (model) {
      this.id = model.obj.id;
      this.name = model.obj.name;
      this.category = model.obj.category;
      this.description = model.obj.description;
      this.onSale = model.obj.on_sale;
      this.price = model.obj.price;
      this.imgUrl = model.img_url;
      this.imgName = model.img_name;
    }
  }
}
