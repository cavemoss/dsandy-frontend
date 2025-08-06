'use client';

import { Check, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CheckoutMainContent, CheckoutProgressHeader, CheckoutStepEnum } from '@/features/checkout';
import BackChevron from '@/shared/components/BackChevron';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { Separator } from '@/shared/shadcd/components/ui/separator';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export default function PaymentPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigates to the previous page in history
  };

  const [step, setStep] = useState(CheckoutStepEnum.SHIPPING_INFO);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  // Mock order data
  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 24.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      variant: 'Midnight Black - Size L',
    },
    {
      id: '2',
      name: 'Premium Cotton T-Shirt',
      price: 24.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&brightness=1.2',
      variant: 'Pure White - Size M',
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. Your order #12345 has been confirmed and will be shipped soon.
              </p>
              <div className="space-y-3">
                <Button className="w-full">Continue Shopping</Button>
                <Button variant="outline" className="w-full">
                  View Order Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BackChevron router={router} title="Checkout" muted="Complete your purchase" />

        <CheckoutProgressHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CheckoutMainContent />
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                      <p className="text-sm">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
