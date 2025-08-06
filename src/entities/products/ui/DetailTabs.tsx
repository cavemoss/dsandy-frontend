import { Product } from '@/api/entities';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';
import { Separator } from '@/shared/shadcd/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/shadcd/components/ui/tabs';

interface Params {
  product: Product;
}

export function ProductDetailTabs({ product }: Params) {
  return (
    <Card className="mb-12">
      <CardContent className="p-6">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                This high-quality product is designed to meet your needs with exceptional craftsmanship and attention to
                detail. Perfect for daily use, it combines functionality with style to deliver outstanding value.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}:</span>
                  <span className="text-muted-foreground">yoyoyo</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Shipping Information</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Free shipping on orders over $50</li>
                  <li>• Standard shipping: 5-7 business days</li>
                  <li>• Express shipping: 2-3 business days</li>
                  <li>• International shipping available</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Returns & Exchanges</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 30-day return policy</li>
                  <li>• Items must be unused and in original packaging</li>
                  <li>• Free return shipping for defective items</li>
                  <li>• Refunds processed within 5-7 business days</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
