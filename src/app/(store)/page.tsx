import { Button } from '@shadcd/button';
import { Award, Clock, Globe, Headphones, Shield, Truck } from 'lucide-react';
import Image from 'next/image';

import { ProductDisplayCard } from '@/entities/products';

const featuredProducts = [
  {
    title: 'Wireless Bluetooth Headphones',
    price: '$79.99',
    originalPrice: '$99.99',
    rating: 5,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
    variantCount: 4,
  },
  {
    title: 'Smart Fitness Watch',
    price: '$149.99',
    originalPrice: '$199.99',
    rating: 4,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
    variantCount: 3,
  },
  {
    title: 'Portable Laptop Stand',
    price: '$29.99',
    rating: 5,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center',
    variantCount: 2,
  },
  {
    title: 'USB-C Hub Adapter',
    price: '$39.99',
    originalPrice: '$54.99',
    rating: 4,
    reviewCount: 203,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&crop=center',
    variantCount: 5,
  },
  {
    title: 'Wireless Phone Charger',
    price: '$24.99',
    rating: 4,
    reviewCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
    variantCount: 3,
  },
  {
    title: 'Bluetooth Speaker',
    price: '$59.99',
    originalPrice: '$79.99',
    rating: 5,
    reviewCount: 298,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center',
    variantCount: 6,
  },
  {
    title: 'Gaming Mouse Pad',
    price: '$19.99',
    rating: 4,
    reviewCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center',
    variantCount: 8,
  },
  {
    title: 'LED Desk Lamp',
    price: '$34.99',
    originalPrice: '$49.99',
    rating: 5,
    reviewCount: 178,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
    variantCount: 4,
  },
];

export default function MainPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/10 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Shop Smart, Live Better
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover premium quality products at unbeatable prices. Fast worldwide shipping, hassle-free returns, and
            24/7 customer support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-12 py-6 text-lg">
              Explore Products
            </Button>
            <Button size="lg" variant="outline" className="px-12 py-6 text-lg">
              View Deals
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose DropShop?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our commitment to quality, speed, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast Delivery</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50 with express delivery options available worldwide.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Safe</h3>
              <p className="text-muted-foreground">
                Bank-level security with encrypted payments and buyer protection guarantee.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-muted-foreground">
                24/7 customer support from our dedicated team of product specialists.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                Curated selection of top-rated products with rigorous quality control.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Returns</h3>
              <p className="text-muted-foreground">30-day hassle-free returns with prepaid shipping labels included.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-muted-foreground">Shipping to over 180 countries with local customer service teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              {"Find exactly what you're looking for in our curated collections"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Electronics',
                image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop',
              },
              {
                name: 'Home & Garden',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
              },
              {
                name: 'Fashion',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
              },
              {
                name: 'Sports',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
              },
            ].map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    width={10}
                    height={10}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of trending products with exceptional ratings and multiple variants
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductDisplayCard
                key={index}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                reviewCount={product.reviewCount}
                imageUrl={product.imageUrl}
                variantCount={product.variantCount}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="px-12">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Never Miss a Deal</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join over 50,000 subscribers and get exclusive deals, early access to sales, and product updates
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-foreground bg-background border-0 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
            />
            <Button variant="secondary" size="lg" className="px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">Unsubscribe anytime. We respect your privacy.</p>
        </div>
      </section>
    </>
  );
}
