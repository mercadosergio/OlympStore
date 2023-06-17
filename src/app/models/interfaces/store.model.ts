import { Category } from "../category.model";
import { Customer } from "./customer.model";
import { ProductImage } from "./product-image.model";

export interface MyOrder {
  id: number;
  customer: Customer;
  items: Item[];
  total: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  description: string;
  slug: string;
  category: Category;
  OrderProduct: OrderProduct;
}

export interface OrderProduct {
  id: number;
  createdAt: string;
  amount: number;
  orderId: number;
  productId: number;
}