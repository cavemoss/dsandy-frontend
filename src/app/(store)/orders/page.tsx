'use client';
import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useOrdersStore } from '@/entities/orders';
import { OrderItemGroup2 } from '@/entities/orders/ui/ItemGroup2';
import BackChevron from '@/shared/components/BackChevron';

export default function OrdersPage() {
  const searchParams = useSearchParams();

  const orders = useOrdersStore((state) => state.orders.all);

  useEffect(() => {
    const orderId = searchParams.get('id') ?? '';
    const element = document.getElementById(orderId);

    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - 150;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BackChevron title="My Orders" desc="View your order history here" />

        {!orders.length ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your order history empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              <Button>Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <OrderItemGroup2 key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
