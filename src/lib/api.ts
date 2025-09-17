import { Product, Category, Blog, Offer, FeaturedProduct, Coupon, User, SearchFilters } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Products API
  async getProducts(filters?: Partial<SearchFilters>): Promise<Product[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search_query) params.append('search', filters.search_query);
    if (filters?.min_price) params.append('min_price', filters.min_price.toString());
    if (filters?.max_price) params.append('max_price', filters.max_price.toString());
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.in_stock) params.append('in_stock', filters.in_stock.toString());
    if (filters?.sort_by) params.append('sort_by', filters.sort_by);

    const queryString = params.toString();
    const endpoint = queryString ? `/api/products?${queryString}` : '/api/products';
    
    return this.request<Product[]>(endpoint);
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/api/products/${id}`);
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return this.request<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    return this.request<Product>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: number): Promise<void> {
    return this.request<void>(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/api/categories');
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    return this.request<Category>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  }

  // Blogs API
  async getBlogs(limit?: number): Promise<Blog[]> {
    const endpoint = limit ? `/api/blogs?_limit=${limit}` : '/api/blogs';
    return this.request<Blog[]>(endpoint);
  }

  // Offers API
  async getOffers(limit?: number): Promise<Offer[]> {
    const endpoint = limit ? `/api/offers?_limit=${limit}` : '/api/offers';
    return this.request<Offer[]>(endpoint);
  }

  // Featured Products API
  async getFeaturedProducts(limit?: number): Promise<FeaturedProduct[]> {
    const endpoint = limit ? `/api/featured-products?_limit=${limit}` : '/api/featured-products';
    return this.request<FeaturedProduct[]>(endpoint);
  }

  // Coupons API
  async getCoupons(): Promise<Coupon[]> {
    return this.request<Coupon[]>('/api/coupons');
  }

  async validateCoupon(code: string): Promise<Coupon> {
    return this.request<Coupon>('/api/coupons', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  // Users API
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/api/users');
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/api/users/${id}`);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.request<User>(`/api/users?email=${email}`);
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return this.request<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return this.request<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
