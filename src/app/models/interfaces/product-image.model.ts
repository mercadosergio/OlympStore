export interface ProductImage {
    id: number;
    imagePath: string;
    position: number;
    filename?: string;
    originalname?: string;
}

export interface CreateProductImageDTO extends Omit<ProductImage, 'id' | 'imagePath' | 'filename' | 'originalname'> {
    productId: number;
    imageFile: File;
}