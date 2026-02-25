'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shadcd/accordion';
import { Card, CardContent } from '@shadcd/card';
import { Separator } from '@shadcd/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcd/tabs';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';

import { Product } from '@/api/entities';
import { useInitStore } from '@/widgets/init';

interface Params {
  product: Product;
}

export function ProductDetailTabs({ product }: Params) {
  const policies = useInitStore((state) => state.subdomain.config.policies);

  const deliveryDate = dayjs().add(product.logistics.deliveryTime, 'days').format('MMM D YYYY');

  const specifications = (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(product.descriptionHtml, {
          ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
          ALLOWED_ATTR: ['href', 'target'],
        }),
      }}
    ></div>
  );

  const description = (
    <div className="grid md:grid-cols-2 gap-4">
      {product.specifications.map(([key, value], index) => (
        <div key={index} className="flex justify-between border-b pb-2">
          <span className="font-medium">{key}:</span>
          <span className="text-muted-foreground">{value}</span>
        </div>
      ))}
    </div>
  );

  const shipping = (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Shipping Information</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• Estimated delivery date: {deliveryDate}</li>
          <li>• International shipping available</li>
        </ul>
      </div>
      <Separator />
      <div>
        <h4 className="font-medium mb-2">Returns & Exchanges</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• {policies.returnDays}-day return policy</li>
          <li>• Items must be unused and in original packaging</li>
          <li>• Free return shipping for defective items</li>
          <li>• Refunds processed within 5-7 business days</li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <Card className="mb-12 hidden md:block">
        <CardContent>
          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              {specifications}
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              {description}
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              {shipping}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Accordion className="px-4 mb-12 w-full block md:hidden" type="single" collapsible defaultValue="shipping">
        <AccordionItem value="description">
          <AccordionTrigger className="font-semibold text-neutral-700">Description</AccordionTrigger>
          <AccordionContent>{specifications}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="specifications">
          <AccordionTrigger className="font-semibold text-neutral-700">Specifications</AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="font-semibold text-neutral-700">Shipping & Returns</AccordionTrigger>
          <AccordionContent>{shipping}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
