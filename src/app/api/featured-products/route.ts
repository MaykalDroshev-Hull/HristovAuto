import { NextRequest, NextResponse } from 'next/server';
import { featuredProducts } from '@/data/featured-products';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get('_limit');

    let filteredProducts = [...featuredProducts];

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      filteredProducts = filteredProducts.slice(0, limitNum);
    }

    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}
