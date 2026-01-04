'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Check } from 'lucide-react';
import { useEffect } from 'react';

import { useOrdersStore } from '@/entities/orders';
import { useNavStore } from '@/widgets/init';

export default function OrderComplete() {
  const ordersStore = useOrdersStore();
  const navStore = useNavStore();

  const orderId = ordersStore.getLastOrderId();

  useEffect(() => {
    if (!orderId) navStore.replace('/');
  }, []);

  return (
    <Card className="container max-w-2xl mx-auto text-center max-h-fit">
      <CardContent className="flex flex-col items-center p-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground w-100 mb-6">
          Thank you for your purchase. <b>Your order {orderId}</b> has been confirmed and will be shipped soon.
        </p>
        <div className="space-y-3">
          <Button className="w-full" onClick={() => navStore.push('/')}>
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navStore.push(`/orders#${ordersStore.orders.lastId}`)}
          >
            View Order Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
