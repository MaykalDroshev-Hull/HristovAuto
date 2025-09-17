# Hristov Auto - Next.js TypeScript E-commerce

A modern auto parts e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS. This project is a complete conversion from the original HTML/JavaScript implementation to a modern React-based application.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Product Management**: Full CRUD operations for products, categories, and more
- **Shopping Cart**: Persistent cart with localStorage integration
- **Search & Filtering**: Advanced product search and filtering capabilities
- **API Routes**: RESTful API endpoints for data management
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Performance**: Optimized images, lazy loading, and modern React patterns

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── signin/            # Authentication
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── sections/          # Page sections (Hero, Categories, etc.)
│   ├── product/           # Product-related components
│   ├── ui/                # Reusable UI components
│   └── forms/             # Form components
├── data/                  # Static data and mock data
├── lib/                   # Utility functions and API client
├── types/                 # TypeScript type definitions
└── styles/                # Global styles and CSS
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **State Management**: React hooks and localStorage
- **API**: Next.js API routes
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hristov-auto-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📱 Pages & Features

### Home Page (`/`)
- Hero section with vehicle selection
- Category browsing with carousel
- Featured products showcase
- Deals of the week
- Blog articles
- Special offers
- Featured vehicle makes

### Products (`/products`)
- Product listing with filters
- Search functionality
- Category filtering
- Price range filtering
- Brand filtering
- Rating filtering
- Sort options

### Product Details (`/products/[id]`)
- Detailed product information
- Image gallery
- Add to cart functionality
- Product specifications
- Customer reviews
- Related products

### Shopping Cart (`/cart`)
- Cart item management
- Quantity adjustments
- Remove items
- Order summary
- Proceed to checkout

### Authentication
- Sign in page (`/signin`)
- Sign up page (`/signup`)
- User account management

## 🔧 API Endpoints

The application includes a complete set of API routes:

- `GET /api/products` - Get all products with filtering
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/categories` - Get all categories
- `GET /api/blogs` - Get blog posts
- `GET /api/offers` - Get special offers
- `GET /api/featured-products` - Get featured products
- `GET /api/coupons` - Get available coupons
- `POST /api/coupons` - Validate coupon code
- `GET /api/users` - Get users
- `POST /api/users` - Create user
- `PUT /api/users/[id]` - Update user

## 🎨 Styling & Design

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable component library
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Prepared for dark mode implementation
- **Accessibility**: WCAG compliant components
- **Animations**: Smooth transitions and hover effects

## 📦 Data Management

- **TypeScript Interfaces**: Strongly typed data models
- **Mock Data**: Static data files for development
- **API Integration**: RESTful API client
- **Local Storage**: Cart persistence
- **State Management**: React hooks for state

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔄 Migration from Original

This Next.js application is a complete conversion from the original HTML/JavaScript implementation:

### What was converted:
- ✅ HTML pages → Next.js App Router pages
- ✅ JavaScript components → React TypeScript components
- ✅ CSS files → Tailwind CSS with custom components
- ✅ JSON data → TypeScript interfaces and data files
- ✅ Manual DOM manipulation → React state management
- ✅ Static assets → Optimized Next.js assets
- ✅ Basic functionality → Enhanced with modern React patterns

### Improvements made:
- 🚀 Better performance with Next.js optimizations
- 🎯 Type safety with TypeScript
- 📱 Better mobile responsiveness
- 🔧 Modern development experience
- 🎨 Consistent design system
- 🛡️ Better error handling
- ⚡ Faster loading times
- 🔍 Better SEO optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original design and functionality from the HTML/JavaScript implementation
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- All contributors and supporters

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Happy coding! 🚀**