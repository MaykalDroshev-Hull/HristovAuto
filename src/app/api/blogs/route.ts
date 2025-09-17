import { NextRequest, NextResponse } from 'next/server';
import { blogs } from '@/data/blogs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('_limit');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredBlogs = [...blogs];

    // Apply category filter
    if (category) {
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Apply search filter
    if (search) {
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.name.toLowerCase().includes(search.toLowerCase()) ||
        blog.category_display.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      filteredBlogs = filteredBlogs.slice(0, limitNum);
    }

    return NextResponse.json(filteredBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
