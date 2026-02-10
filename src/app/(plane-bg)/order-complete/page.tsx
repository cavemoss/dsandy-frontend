'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Check, Package } from 'lucide-react';

import { useOrdersStore } from '@/entities/orders';
import { useNavStore } from '@/widgets/init';

export default function OrderComplete() {
  const navStore = useNavStore();

  const orderId = useOrdersStore((state) => state.orders.lastId);
  const orderIdFormatted = '#' + orderId?.toString().padStart(5, '0');

  return (
    <Card className="m-auto text-center max-w-full">
      <CardContent className="flex flex-col items-center py-12">
        <div className="w-18 h-18 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-9 w-9 text-green-600" />
        </div>
        <div className="text-2xl font-bold mb-4">Order Confirmed!</div>
        <div className="text-muted-foreground w-100 mb-6 max-w-full">
          Thank you for your purchase!
          <br /> <b>Your order {orderIdFormatted}</b> has been confirmed and will be shipped soon.
        </div>
        <Button className="w-60" onClick={() => navStore.push(`/orders?id=${orderId}`)}>
          <Package /> View Order Details
        </Button>
      </CardContent>
    </Card>
  );
}
