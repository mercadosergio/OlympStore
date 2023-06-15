import { FormControl } from "@angular/forms";
import { Category } from "./category.model";
import { ProductImage } from "./interfaces/product-image.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  description: string;
  slug: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category' | 'images' | 'slug'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {

}

export interface IFormProduct {
  name: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  images: FormControl<string[]>
  categoryId: FormControl<number>;

}
