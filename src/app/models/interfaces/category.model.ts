export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface CreateCategoryDTO extends Omit<Category, 'id' | 'image' | 'slug'> {
  image: File;
}