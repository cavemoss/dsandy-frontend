import dayjs from 'dayjs';
import { Package } from 'lucide-react';

import { useOrdersStore } from '@/entities/orders';
import { useProductsStore } from '@/entities/products';
import { objectByKey } from '@/shared/lib/utils';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { Separator } from '@/shared/shadcd/components/ui/separator';
import { TabsContent } from '@/shared/shadcd/components/ui/tabs';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

export default function OrdersHistory() {
  const ordersStore = useOrdersStore();
  const productsStore = useProductsStore();

  const orders = useOrdersStore((state) => state.orders);

  return (
    <TabsContent value="orders">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 min-h-[36px]">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.map((order, idx) => (
            <>
              <div className="flex items-center gap-2">
                <p className="text-base text-gray-600 whitespace-nowrap">
                  Order #{order.id.toString().padStart(5, '0')}
                </p>
                <Badge variant="outline" className="text-gray-400">
                  {dayjs(order.createdAt).format('MMM D YYYY')}
                </Badge>
                <Separator className="shrink-1" />
              </div>

              {order.orderItems.map((item, idx) => {
                const product = productsStore.getProductsByIds()[item.dProductId];
                const scu = objectByKey(product.scus, 'propertyValueId')[item.skuAttr.split(':')[1]];

                return (
                  <div key={idx} className="flex gap-3 border rounded-lg p-4">
                    <ImageWithFallback className="h-30 brightness-95 rounded-sm" src={scu.image} />

                    <div>
                      <span className="font-medium line-clamp-2">{product.name}</span>
                      <p className="text-sm text-muted-foreground">
                        {scu.propertyName}: {scu.propertyValueName}
                      </p>
                      <p className="text-sm mt-3">
                        {item.quantity} item • ${(scu.priceInfo.dsOfferPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="ml-auto">
                      <Badge>Delivered</Badge>
                    </div>
                  </div>
                );
              })}
            </>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
