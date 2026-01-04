import { Package } from 'lucide-react';

import { useOrdersStore } from '@/entities/orders';
import OrderCard from '@/entities/orders/ui/Card';
import OrderSeparator from '@/entities/orders/ui/Separator';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { TabsContent } from '@/shared/shadcd/components/ui/tabs';

export default function OrdersHistory() {
  const orders = useOrdersStore((state) => state.orders.all);

  if (!orders.length) {
    return (
      <TabsContent value="orders" className="mb-0">
        <Card>
          <CardContent className="py-6 flex flex-col items-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Your order history empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="orders" className="mb-0">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 min-h-[36px]">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.map((order) => (
            <>
              <OrderSeparator order={order} />

              {order.orderItems.map((item, index) => (
                <OrderCard key={index} order={order} item={item} inner />
              ))}
            </>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
