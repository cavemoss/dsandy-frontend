'use client';
import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Package } from 'lucide-react';

import { useOrdersStore } from '@/entities/orders';
import OrderInfo from '@/entities/orders/ui/Info';
import BackChevron from '@/shared/components/BackChevron';

export default function OrdersPage() {
  const orders = useOrdersStore((state) => state.orders.all);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BackChevron title="My Orders" muted="View your order history here" />

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
              <OrderInfo key={order.id} order={order} />
            ))}

            {/* {orders.map((order, idx) => (
              <div key={idx} className="space-y-4">
                <OrderSeparator order={order} />

                {order.orderItems.map((item, index) => (
                  <OrderCard order={order} item={item} key={index} />
                ))}
              </div>
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
}
