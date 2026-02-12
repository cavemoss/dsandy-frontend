'use client';

import { Button } from '@shadcd/button';
import { CardContent } from '@shadcd/card';
import { Package } from 'lucide-react';

import { OrderItemGroupInner, useOrdersStore } from '@/entities/orders';

export default function CustomerOrderHistory() {
  const orders = useOrdersStore((state) => state.orders.all);

  if (!orders.length) {
    return (
      <CardContent className="py-6 flex flex-col items-center">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Your order history is empty</h2>
        <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
        <Button>Continue Shopping</Button>
      </CardContent>
    );
  }

  return (
    <CardContent className="space-y-7">
      {orders.map((order, index, { length }) => (
        <OrderItemGroupInner order={order} key={index} isLast={index + 1 == length} />
      ))}
    </CardContent>
  );
}
