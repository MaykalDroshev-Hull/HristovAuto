import { NextRequest, NextResponse } from 'next/server';
import { offers } from '@/data/offers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get('_limit');
    const active = searchParams.get('active');

    let filteredOffers = [...offers];

    // Filter active offers
    if (active === 'true') {
      filteredOffers = filteredOffers.filter(offer => 
        offer.valid_until && new Date(offer.valid_until) > new Date()
      );
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      filteredOffers = filteredOffers.slice(0, limitNum);
    }

    return NextResponse.json(filteredOffers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}
