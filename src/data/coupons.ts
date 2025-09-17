import { Coupon } from '@/types';

export const coupons: Coupon[] = [
  {
    id: 1,
    code: "masai20",
    discount: 20,
    type: "percentage",
    min_amount: 1000,
    valid_until: "2024-12-31",
    is_active: true
  },
  {
    id: 2,
    code: "free99",
    discount: 99,
    type: "fixed",
    min_amount: 500,
    valid_until: "2024-12-31",
    is_active: true
  }
];
