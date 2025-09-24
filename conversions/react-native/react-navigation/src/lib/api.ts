export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export class API {
  private baseURL: string = 'https://dummyjson.com';

  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${this.baseURL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data: ProductsResponse = await response.json();
    return data.products;
  }

  async fetchProduct(id: string): Promise<Product> {
    const response = await fetch(`${this.baseURL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  }

  async login(username: string, password: string): Promise<User> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password } as LoginRequest),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  }
}
