'use client';

import { Button } from '@shadcd/button';
import { CardContent } from '@shadcd/card';
import { TabsContent } from '@shadcd/tabs';
import { Package } from 'lucide-react';

import { OrderItemGroup, useOrdersStore } from '@/entities/orders';

export default function CustomerOrderHistory() {
  const orders = useOrdersStore((state) => state.orders.all);

  if (!orders.length) {
    return (
      <TabsContent value="orders" className="mb-0">
        <CardContent className="py-6 flex flex-col items-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your order history is empty</h2>
          <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
          <Button>Continue Shopping</Button>
        </CardContent>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="orders" className="mb-0">
      <CardContent className="space-y-4">
        {orders.map((order, index) => (
          <OrderItemGroup order={order} key={index} open={!index} />
        ))}
      </CardContent>
    </TabsContent>
  );
}
