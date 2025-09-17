import { NextRequest, NextResponse } from 'next/server';
import { coupons } from '@/data/coupons';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const active = searchParams.get('active');

    let filteredCoupons = [...coupons];

    // Filter by code
    if (code) {
      filteredCoupons = filteredCoupons.filter(coupon =>
        coupon.code.toLowerCase() === code.toLowerCase()
      );
    }

    // Filter active coupons
    if (active === 'true') {
      filteredCoupons = filteredCoupons.filter(coupon => 
        coupon.is_active && 
        (!coupon.valid_until || new Date(coupon.valid_until) > new Date())
      );
    }

    return NextResponse.json(filteredCoupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    // Validate coupon
    const coupon = coupons.find(c => 
      c.code.toLowerCase() === code.toLowerCase() && 
      c.is_active &&
      (!c.valid_until || new Date(c.valid_until) > new Date())
    );

    if (!coupon) {
      return NextResponse.json(
        { error: 'Invalid or expired coupon' },
        { status: 400 }
      );
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}
