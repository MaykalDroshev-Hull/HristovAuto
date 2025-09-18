import { NextRequest, NextResponse } from 'next/server';
import { categories } from '@/data/categories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get('_limit');
    const search = searchParams.get('search');

    let filteredCategories = [...categories];

    // Apply search filter
    if (search) {
      filteredCategories = filteredCategories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      filteredCategories = filteredCategories.slice(0, limitNum);
    }

    return NextResponse.json(filteredCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newCategory = await request.json();
    
    // Generate new ID
    const maxId = Math.max(...categories.map(c => c.id || 0));
    newCategory.id = maxId + 1;
    
    // Add to categories array
    categories.push(newCategory);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
