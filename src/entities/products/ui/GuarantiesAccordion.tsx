import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { RotateCcw, Shield, Truck } from 'lucide-react';

import { Accordion } from '@/shared/shadcd/components/ui/accordion';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';

export function ProductGuarantiesAccordion() {
  return (
    <div className="lg:col-span-3">
      <Card className="sticky top-8">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Our Guarantees</h3>
          <Accordion type="multiple" className="w-full" defaultValue={['shipping', 'security', 'returns']}>
            <AccordionItem value="shipping">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Free Shipping</div>
                    <div className="text-sm text-muted-foreground">Orders over $50</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="pl-8 space-y-2 text-muted-foreground">
                  <p>
                    Enjoy complimentary shipping on all orders over $50. We partner with trusted carriers to ensure your
                    items arrive safely and on time.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Standard delivery: 5-7 business days</li>
                    <li>• Express delivery: 2-3 business days (additional cost)</li>
                    <li>• Same-day delivery available in select cities</li>
                    <li>• International shipping to over 50 countries</li>
                    <li>• Real-time tracking provided for all orders</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Secure Payment</div>
                    <div className="text-sm text-muted-foreground">SSL Protected</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="pl-8 space-y-2 text-muted-foreground">
                  <p>
                    Your payment information is protected with industry-leading security measures. We use 256-bit SSL
                    encryption to safeguard all transactions.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• PCI DSS Level 1 compliance</li>
                    <li>• Multiple payment options: Credit/Debit cards, PayPal, Apple Pay</li>
                    <li>• Fraud detection and prevention systems</li>
                    <li>• Secure tokenization of payment data</li>
                    <li>• Zero storage of sensitive payment information</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">30-Day Returns</div>
                    <div className="text-sm text-muted-foreground">Money back guarantee</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="pl-8 space-y-2 text-muted-foreground">
                  <p>
                    Not completely satisfied? Return your purchase within 30 days for a full refund. No questions asked,
                    no restocking fees.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Full 30-day return window from delivery date</li>
                    <li>• Free return shipping with prepaid labels</li>
                    <li>• Items must be in original condition and packaging</li>
                    <li>• Refunds processed within 5-7 business days</li>
                    <li>• Exchange option available for different sizes/colors</li>
                    <li>• Dedicated customer service support for returns</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
