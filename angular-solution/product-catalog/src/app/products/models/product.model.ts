export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    inStock: boolean;
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface PriceRange {
    min: number;
    max: number;
  }
  