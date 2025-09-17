import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';
import { Product, SearchFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const category = searchParams.get('category');
    const search = searchParams.get('search') || searchParams.get('q');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const brand = searchParams.get('brand');
    const rating = searchParams.get('rating');
    const inStock = searchParams.get('in_stock');
    const sortBy = searchParams.get('sort_by');
    const limit = searchParams.get('_limit');
    const page = searchParams.get('_page') || '1';

    let filteredProducts = [...products];

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      filteredProducts = filteredProducts.filter(product => product.discounted_price >= min);
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filteredProducts = filteredProducts.filter(product => product.discounted_price <= max);
    }

    if (brand) {
      filteredProducts = filteredProducts.filter(product =>
        product.brand?.toLowerCase().includes(brand.toLowerCase())
      );
    }

    if (rating) {
      const minRating = parseFloat(rating);
      filteredProducts = filteredProducts.filter(product => 
        (product.rating || 0) >= minRating
      );
    }

    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(product => product.in_stock);
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.discounted_price - b.discounted_price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.discounted_price - a.discounted_price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case 'popular':
          filteredProducts.sort((a, b) => (b.rating_count || 0) - (a.rating_count || 0));
          break;
      }
    }

    // Apply pagination
    const pageNum = parseInt(page);
    const limitNum = limit ? parseInt(limit) : filteredProducts.length;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json(paginatedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProduct: Product = await request.json();
    
    // Generate new ID
    const maxId = Math.max(...products.map(p => p.id));
    newProduct.id = maxId + 1;
    
    // Add to products array (in a real app, this would be saved to database)
    products.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
