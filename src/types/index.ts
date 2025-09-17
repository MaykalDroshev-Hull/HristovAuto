// User related types
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  cart?: Product[];
  favorites?: Product[];
  orders?: Order[];
}

// Product related types
export interface Product {
  id: number;
  name: string;
  image_url: string;
  original_price: number;
  discounted_price: number;
  description?: ProductDescription;
  rating?: number;
  rating_count?: number;
  category?: string;
  brand?: string;
  in_stock?: boolean;
  sku?: string;
}

export interface ProductDescription {
  highlights: string;
  other_specs: string;
  description: string;
  terms_condition: string;
}

// Category types
export interface Category {
  id?: number;
  name: string;
  image_url: string;
  slug?: string;
}

// Blog types
export interface Blog {
  id: number;
  category: string;
  category_display: string;
  name: string;
  image_url: string;
  data: string;
  content?: string;
  slug?: string;
}

// Offer types
export interface Offer {
  id?: number;
  name: string;
  image_url: string;
  description?: string;
  discount_percentage?: number;
  valid_until?: string;
}

// Featured product types
export interface FeaturedProduct {
  id: number;
  name: string;
  image_url: string;
  description?: string;
  link?: string;
}

// Coupon types
export interface Coupon {
  id?: number;
  code: string;
  discount: number;
  type?: 'percentage' | 'fixed';
  min_amount?: number;
  valid_until?: string;
  is_active?: boolean;
}

// Cart and Order types
export interface CartItem {
  product: Product;
  quantity: number;
  added_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: Address;
  billing_address: Address;
  payment_method: string;
  order_date: string;
  tracking_number?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Search and Filter types
export interface SearchFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
  brand?: string;
  rating?: number;
  in_stock?: boolean;
  search_query?: string;
  sort_by?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Vehicle selection types
export interface Vehicle {
  year: string;
  make: string;
  model: string;
}

// Component Props types
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  showAddToCart?: boolean;
  className?: string;
}

export interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
  className?: string;
}

export interface BlogCardProps {
  blog: Blog;
  onClick?: (blog: Blog) => void;
  className?: string;
}

export interface OfferCardProps {
  offer: Offer;
  onClick?: (offer: Offer) => void;
  className?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_accepted: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// State management types
export interface AppState {
  user: User | null;
  cart: CartItem[];
  favorites: Product[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Theme types
export interface Theme {
  mode: 'light' | 'dark';
  primary_color: string;
  secondary_color: string;
}
