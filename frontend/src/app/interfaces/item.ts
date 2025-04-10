interface Size {
  id?: number;
  width: number;
  length: number;
  height: number;
}

export interface Category {
  id?: number;
  title: string;
  link: string;
  image: string;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: Category;
  size: Size;
}
