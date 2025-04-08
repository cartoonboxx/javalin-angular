interface Size {
  width: number;
  length: number;
  height: number;
}

export interface Category {
  title: string;
  link: string;
  image: string;
}

export default interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
  sizes: Size;
}
