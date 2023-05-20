import { FormControl } from "@angular/forms";
import { Category } from "./category.model";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {

}

export interface IFormProduct {
  title: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  images: FormControl<string[]>
  categoryId: FormControl<number>;

}
