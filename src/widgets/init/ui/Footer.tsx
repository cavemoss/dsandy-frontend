import {
  CreditCard,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Shield,
  Truck,
  Twitter,
  Youtube,
} from 'lucide-react';

import { Button } from '@/shared/shadcd/components/ui/button';
import { Input } from '@/shared/shadcd/components/ui/input';
import { Separator } from '@/shared/shadcd/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      {/* Features section */}
      <div className="border-b bg-background/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-sm text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">Customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">DropShop</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted dropshipping partner for quality products at unbeatable prices. We bring you the latest
              trends and essentials from around the world.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Shipping Info
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Returns
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Size Guide
              </a>
            </div>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm">support@dropshop.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm">123 Commerce St, City, State 12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 DSAndyStore. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">We accept:</span>
            <div className="flex gap-1">
              <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
                <CreditCard className="h-3 w-3" />
              </div>
              <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs font-medium">V</div>
              <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs font-medium">MC</div>
              <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs font-medium">PP</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
