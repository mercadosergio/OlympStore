export interface ProductImage {
    id: number;
    imagePath: string;
    position: number;
}

export interface CreateProductImageDTO extends Omit<ProductImage, 'id'> {
    productId: number;
}