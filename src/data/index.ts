// Export all data
export { categories } from './categories';
export { products } from './products';
export { blogs } from './blogs';
export { offers } from './offers';
export { featuredProducts } from './featured-products';
export { coupons } from './coupons';
import { User } from '@/types';

// Mock users data
export const users: User[] = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    cart: [],
    favorites: [],
    orders: []
  }
];
